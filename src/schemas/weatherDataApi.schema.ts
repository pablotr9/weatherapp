import { weatherCodeDescriptions } from "@/constants/weatherCode.constants";
import * as z from "zod";

export const WeatherDataApiSchema = z
  .object({
    daily: z.object({
      time: z.array(z.string()),
      temperature_2m_max: z.array(z.number()),
      temperature_2m_min: z.array(z.number()),
      precipitation_sum: z.array(z.number()),
      windspeed_10m_max: z.array(z.number()),
      weathercode: z.array(z.number()),
    }),
  })
  .transform((data) => {
    return {
      weather: {
        time: data.daily.time[0],
        temperature:
          (data.daily.temperature_2m_max[0] +
            data.daily.temperature_2m_min[0]) /
          2,
        precipitation: data.daily.precipitation_sum[0],
        windSpeed: data.daily.windspeed_10m_max[0],
      },
      description: weatherCodeDescriptions[data.daily.weathercode[0]] ?? "-",
    };
  });

export type WeatherDataApi = z.infer<typeof WeatherDataApiSchema>;
