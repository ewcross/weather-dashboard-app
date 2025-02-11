import { z } from "zod";
import { openWeatherResponseSchema } from "./openWeatherApi";

export const weatherDataSchema = openWeatherResponseSchema.extend({
  name: z.string(),
  state: z.string().optional(),
});

export type WeatherData = z.infer<typeof weatherDataSchema>;

export const nextResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([z.object({ data: dataSchema }), z.object({ error: z.string() })]);

export const weatherDataResponseSchema = nextResponseSchema(weatherDataSchema);

export type WeatherDataResponse = z.infer<typeof weatherDataResponseSchema>;
