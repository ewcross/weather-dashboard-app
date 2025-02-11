"use client";

import { DailyWeatherData } from "@/lib/schemas/openWeatherApi";
import { getDayString, getImageUrl, getRoundedTemp } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type Props = {
  forescast: DailyWeatherData;
};

export const Forecast = ({ forescast }: Props) => {
  const [isFullWeek, setIsFullWeek] = useState(false);

  const days = isFullWeek ? forescast.slice(1, 8) : forescast.slice(1, 4);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2 flex-wrap items-center">
        {days.map((day) => (
          <div
            key={day.dt}
            className="flex flex-col items-center w-28 py-4 rounded bg-blue-300 text-center"
          >
            <p className="font-semibold text-xs">{getDayString(day.dt)}</p>
            <p className="font-semibold">
              {`${getRoundedTemp(day.temp.day)}° / ${getRoundedTemp(
                day.temp.night
              )}°`}
            </p>
            <Image
              height={30}
              width={30}
              src={getImageUrl(day.weather[0].icon)}
              alt={day.weather[0].description}
            ></Image>
          </div>
        ))}
      </div>
      <button
        className="text-xs text-white hover:underline"
        onClick={() => setIsFullWeek(!isFullWeek)}
      >
        {`${isFullWeek ? "Hide" : "Show"} full week forecast`}
      </button>
    </div>
  );
};
