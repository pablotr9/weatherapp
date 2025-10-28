import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const SearchTypeInput = ({
  setSearchByCity,
  isSearchByCity,
}: {
  isSearchByCity: boolean;
  setSearchByCity: (value: boolean) => void;
}) => {
  return (
    <>
      <Switch
        id="search-by-city"
        checked={isSearchByCity}
        onCheckedChange={() => setSearchByCity(!isSearchByCity)}
      />
      <Label htmlFor="search-by-city">Search by city</Label>
    </>
  );
};
