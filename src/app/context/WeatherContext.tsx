"use client";

import { WeatherData, weatherDataResponseSchema } from "@/lib/schemas/api";
import { createContext, ReactNode, useContext, useState } from "react";

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (city: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateError = (error: string) => {
    setError(error);
    setWeatherData(null);
  };

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      );
      const responseJson = await response.json();

      const result = weatherDataResponseSchema.safeParse(responseJson);

      if (!result.success) {
        console.error(result.error.message);
        updateError("Oops, womething went wrong, please try again later");
        return;
      }

      if ("error" in result.data) {
        console.error(result.data.error);
        updateError(result.data.error);
        return;
      }

      setWeatherData(result.data.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      updateError("Oops, womething went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        fetchWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
