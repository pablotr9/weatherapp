import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useSearchStore } from "@/store/searchStore";
import {
  Thermometer,
  Wind,
  Droplet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { EmptyCard } from "./components/emptyCard";
import { SkeletonCard } from "./components/skeletonCard";
import { ErrorCard } from "./components/errorCard";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useWeatherCardStatus } from "./hooks/useWeatherCardStatus.hook";

export const WeatherCard = () => {
  const { currentCardCity, startDate, setStartDate } = useSearchStore();

  const { searchParams, showNextButton, showPreviousButton } =
    useWeatherCardStatus();

  const { data, isFetching, isError, error } = useWeatherData(searchParams);

  if (data && currentCardCity) {
    return (
      <div className="flex items-center justify-center gap-2">
        {showPreviousButton && (
          <Button
            variant="outline"
            onClick={() => {
              const previousDate = new Date(startDate!);
              previousDate.setDate(previousDate.getDate() - 1);
              setStartDate(previousDate);
            }}
            disabled={!data || isFetching}
          >
            <ChevronLeft className="h-4 w-4" /> Previous day
          </Button>
        )}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentCardCity?.name
                ? currentCardCity.name
                : "Selected coordinates"}
            </CardTitle>
            <CardDescription>
              {format(startDate!, "yyyy-MM-dd")}
            </CardDescription>
            <CardDescription>{data.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-4xl font-bold">
              <Thermometer className="h-10 w-10" />
              {data.weather.temperature.toFixed(1)}°C
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5" />
                <span>
                  Precipitation: {data.weather.precipitation.toFixed(1)} mm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5" />
                <span>Wind: {data.weather.windSpeed.toFixed(1)} km/h</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {showNextButton && (
          <Button
            variant="outline"
            onClick={() => {
              const nextDate = new Date(startDate!);
              nextDate.setDate(nextDate.getDate() + 1);
              setStartDate(nextDate);
            }}
          >
            Next day <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  if (isFetching) {
    return <SkeletonCard />;
  }

  if (isError) {
    return <ErrorCard error={error as Error} />;
  }

  return <EmptyCard />;
};
