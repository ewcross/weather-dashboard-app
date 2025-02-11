"use client";

import { useWeather } from "@/app/context/WeatherContext";
import type React from "react";
import { useState } from "react";

export const CityForm = () => {
  const [city, setCity] = useState("");
  const { fetchWeatherData } = useWeather();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      await fetchWeatherData(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-0"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
      >
        Get Weather
      </button>
    </form>
  );
};
