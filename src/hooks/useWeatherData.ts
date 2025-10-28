import {
  WeatherDataApiSchema,
  type WeatherDataApi,
} from "@/schemas/weatherDataApi.schema";
import type {
  WeatherApiResponse,
  WeatherSearchParams,
} from "@/types/weatherApi.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";

const fetchWeather = async ({
  latitude,
  longitude,
  startDate,
}: WeatherSearchParams): Promise<WeatherDataApi> => {
  const API_URL = "https://api.open-meteo.com/v1/forecast";
  const formattedStartDate = format(startDate, "yyyy-MM-dd");

  const params = {
    latitude,
    longitude,
    start_date: formattedStartDate,
    end_date: formattedStartDate,
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode",
    timezone: "auto",
  };

  const { data } = await axios.get(API_URL, { params });
  const weatherData = WeatherDataApiSchema.parse(data);
  return weatherData;
};

export const useWeatherData = (params: WeatherSearchParams | null) => {
  return useQuery({
    queryKey: ["weather", params],
    queryFn: () => fetchWeather(params!),
    enabled: !!params,
  });
};
