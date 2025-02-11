import { z } from "zod";

export const locationSchema = z.object({
  name: z.string(),
  state: z.string().optional(),
  lat: z.number(),
  lon: z.number(),
});

export type LocationData = z.infer<typeof locationSchema>;

export const locationArraySchema = z.array(locationSchema);

const currentWeatherSchema = z.object({
  dt: z.number(),
  temp: z.number(),
  weather: z
    .array(
      z.object({
        id: z.number(),
        description: z.string(),
        icon: z.string(),
      })
    )
    .nonempty(),
});

export type CurrentWeatherData = z.infer<typeof currentWeatherSchema>;

const dailyWeatherSchema = z.array(
  z.object({
    dt: z.number(),
    temp: z.object({
      day: z.number(),
      night: z.number(),
    }),
    weather: z
      .array(
        z.object({
          description: z.string(),
          icon: z.string(),
        })
      )
      .nonempty(),
  })
);

export type DailyWeatherData = z.infer<typeof dailyWeatherSchema>;

export const openWeatherResponseSchema = z.object({
  current: currentWeatherSchema,
  daily: dailyWeatherSchema,
});

export type OpenWeatherResponseData = z.infer<typeof openWeatherResponseSchema>;
