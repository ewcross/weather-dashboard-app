import { WeatherDataResponse } from "@/lib/schemas/api";
import {
  locationArraySchema,
  LocationData,
  OpenWeatherResponseData,
  openWeatherResponseSchema,
} from "@/lib/schemas/openWeatherApi";
import { Result } from "@/lib/types";
import { NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

const getErrorResponse = (code: number, message?: string) =>
  NextResponse.json(
    { error: message || "Weather data not available, please try again later" },
    { status: code }
  );

const fetchLocationData = async (
  city: string
): Promise<Result<LocationData>> => {
  try {
    const locationResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    if (!locationResponse.ok) {
      return {
        success: false,
        error: `Failed to fetch location data for city: ${city}`,
      };
    }

    const locationDataJson = await locationResponse.json();
    const locationData = locationArraySchema.safeParse(locationDataJson);
    if (!locationData.success) {
      return {
        success: false,
        error: `Invalid location data format for city: ${city}: ${locationData.error.message}`,
      };
    }

    if (!locationData.data.length) {
      return {
        success: false,
        error: `Location not found for city: ${city}`,
      };
    }

    return { success: true, data: locationData.data[0] };
  } catch (error) {
    return {
      success: false,
      error: `Error fetching location data: ${error}`,
    };
  }
};

const fetchWeatherData = async (
  lat: number,
  lon: number
): Promise<Result<OpenWeatherResponseData>> => {
  try {
    const weatherResponse = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=minutely,hourly,alerts&units=metric`
    );
    if (!weatherResponse.ok) {
      return {
        success: false,
        error: `Failed to fetch weather data for coordinates: (${lat}, ${lon})`,
      };
    }

    const weatherDataJson = await weatherResponse.json();
    const weatherData = openWeatherResponseSchema.safeParse(weatherDataJson);
    if (!weatherData.success) {
      return {
        success: false,
        error: `Invalid weather data format for coordinates: (${lat}, ${lon}): ${weatherData.error.message}`,
      };
    }

    return { success: true, data: weatherData.data };
  } catch (error) {
    return {
      success: false,
      error: `Error fetching weather data: ${error}`,
    };
  }
};

export async function GET(
  request: Request
): Promise<NextResponse<WeatherDataResponse>> {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    console.error("City parameter is required");
    return getErrorResponse(400);
  }

  if (!API_KEY) {
    console.error("OPENWEATHER_API_KEY is not set");
    return getErrorResponse(500);
  }

  const locationResult = await fetchLocationData(city);
  if (!locationResult.success) {
    console.error("Location fetch error:", locationResult.error);
    return getErrorResponse(
      500,
      "Weather data not available, please make sure the city name is correct"
    );
  }

  const weatherResult = await fetchWeatherData(
    locationResult.data.lat,
    locationResult.data.lon
  );
  if (!weatherResult.success) {
    console.error("Weather fetch error:", weatherResult.error);
    return getErrorResponse(500);
  }

  return NextResponse.json({
    data: {
      ...weatherResult.data,
      name: locationResult.data.name,
      state: locationResult.data.state,
    },
  });
}
