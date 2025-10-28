import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CitySearcher } from "./components/citySearcher/citySearcher";
import { useSearchStore } from "@/store/searchStore";
import { StartDateInput } from "./components/startDateInput";
import { SearchTypeInput } from "./components/searchTypeInput";
import { CoordinatesGroup } from "./components/coordinatesGroup";

export const SearchForm = () => {
  const { currentCity, setCurrentCardCity } = useSearchStore();
  const [isSearchingByCity, setIsSearchingByCity] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentCardCity(currentCity);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
    >
      {isSearchingByCity ? <CitySearcher /> : <CoordinatesGroup />}

      <div className="flex items-center space-x-2 mt-9">
        <SearchTypeInput
          setSearchByCity={setIsSearchingByCity}
          isSearchByCity={isSearchingByCity}
        />
      </div>
      <div className="flex flex-col pt-2">
        <StartDateInput />
      </div>
      <div className="hidden md:block"></div>
      <div className="flex flex-col pt-2">
        <Button
          type="submit"
          className="mt-5"
          disabled={!currentCity?.lat || !currentCity?.lon}
        >
          Search
        </Button>
      </div>
    </form>
  );
};
