"use client";

import { useWeather } from "@/app/context/WeatherContext";
import { LoaderCircle } from "lucide-react";
import { CityForm } from "./CityForm";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";

export const WeatherDashboard = () => {
  const { weatherData, loading, error } = useWeather();

  return (
    <div className="space-y-4 flex flex-col items-center">
      <CityForm />
      {loading && <LoaderCircle className="animate-spin text-white" />}
      {error !== null && (
        <p className="max-w-72 text-white text-center">
          {error || "Unable to fetch weather data"}
        </p>
      )}
      {error === null && weatherData && (
        <div className="flex flex-col items-center">
          <CurrentWeather
            name={weatherData.name}
            state={weatherData.state}
            weatherData={weatherData.current}
          />
          <Forecast forescast={weatherData.daily} />
        </div>
      )}
    </div>
  );
};
