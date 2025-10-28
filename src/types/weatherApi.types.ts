export interface DailyUnits {
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  windspeed_10m_max: string;
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
  weathercode: number[];
}

export interface WeatherApiResponse {
  weather: {
    time: string;
    temperature: number;
    precipitation: number;
    windSpeed: number;
  };
}
export interface WeatherSearchParams {
  latitude: number;
  longitude: number;
  startDate: Date;
}
