import { MOCK_CITIES } from "@/mocks/cities.mock";
import type { CitySuggestion } from "../types/citySearcher.types";

export const fetchCities = async (query: string): Promise<CitySuggestion[]> => {
  // mocking an API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_CITIES.filter((city) =>
    city.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);
};
