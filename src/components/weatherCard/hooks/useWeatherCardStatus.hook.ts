import { useSearchStore } from "@/store/searchStore";
import type { WeatherSearchParams } from "@/types/weatherApi.types";
import { useMemo } from "react";

export const useWeatherCardStatus = () => {
  const { currentCardCity, startDate } = useSearchStore();

  const searchParams = useMemo((): WeatherSearchParams | null => {
    const lat = currentCardCity?.lat;
    const lon = currentCardCity?.lon;

    if (lat && lon && startDate) {
      return {
        latitude: lat,
        longitude: lon,
        startDate,
      };
    }

    return null;
  }, [currentCardCity?.lat, currentCardCity?.lon, startDate]);

  const showNextButton = useMemo(() => {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(new Date().getDate() + 7);
    if (!startDate) return false;
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay <= sevenDaysFromNow;
  }, [startDate]);

  const showPreviousButton = useMemo(() => {
    if (!startDate) return false;
    const previousDay = new Date(startDate);
    previousDay.setDate(previousDay.getDate() - 1);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return previousDay >= oneMonthAgo;
  }, [startDate]);

  return { searchParams, showNextButton, showPreviousButton };
};
