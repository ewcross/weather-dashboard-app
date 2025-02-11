import { CurrentWeatherData } from "@/lib/schemas/openWeatherApi";
import {
  firstLetterCaps,
  getDateString,
  getImageUrl,
  getRoundedTemp,
} from "@/lib/utils";
import Image from "next/image";

type Props = {
  name: string;
  state?: string;
  weatherData: CurrentWeatherData;
};

export const CurrentWeather = ({ name, state, weatherData }: Props) => {
  const location = state ? `${name}, ${state}` : name;
  const conditions = weatherData.weather;

  return (
    <div className="p-4 text-center text-white">
      <p className="mb-1 text-xs">{getDateString(weatherData.dt)}</p>
      <p className="mb-2 text-lg">{location}</p>
      <p className="font-bold text-7xl">{`${getRoundedTemp(
        weatherData.temp
      )}°`}</p>
      {conditions.length > 0 && (
        <div className="flex gap-2 justify-center items-center">
          <p>
            {conditions
              .map((cond) => firstLetterCaps(cond.description))
              .join(", ")}
          </p>
          {conditions.map((cond) => (
            <Image
              key={cond.id}
              height={50}
              width={50}
              src={getImageUrl(cond.icon)}
              alt={cond.description}
            ></Image>
          ))}
        </div>
      )}
    </div>
  );
};
