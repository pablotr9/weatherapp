import { useState, useEffect, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { fetchCities } from "./utils/citySearcher.utils";
import type { CitySuggestion } from "./types/citySearcher.types";
import { useSearchStore } from "@/store/searchStore";

export const CitySearcher = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentCity, setCurrentCity } = useSearchStore();

  const executeSearch = (query: string) => {
    setIsLoading(true);
    fetchCities(query).then((results) => {
      setSuggestions(results);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    executeSearch("");
  }, []);

  const debouncedFetch = useMemo(() => debounce(executeSearch, 400), []);
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
    debouncedFetch(query);
  };

  return (
    <div className="flex flex-col pt-2 md:col-span-2">
      <Label className="mb-1.5">City</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal",
              !currentCity && "text-muted-foreground"
            )}
          >
            {currentCity?.name
              ? `${currentCity.name}, ${currentCity.country}`
              : "Search for a city..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[--radix-popover-trigger-width] p-0"
        >
          <Command>
            <CommandInput
              placeholder="Type to search a city..."
              value={searchQuery}
              onValueChange={handleQueryChange}
            />
            <CommandList>
              {isLoading && (
                <div className="p-2 text-sm text-center">Searching...</div>
              )}
              {!isLoading && suggestions.length === 0 && (
                <CommandEmpty>No cities found.</CommandEmpty>
              )}
              <CommandGroup>
                {suggestions.map((city) => (
                  <CommandItem
                    key={`${city.lat}-${city.lon}`}
                    value={`${city.name}, ${city.country}`}
                    onSelect={() => {
                      const cityData = {
                        name: city.name,
                        country: city.country,
                        lat: city.lat,
                        lon: city.lon,
                      };
                      setCurrentCity(cityData);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentCity?.lat === city.lat &&
                          currentCity?.lon === city.lon
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {city.name}, {city.country}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
