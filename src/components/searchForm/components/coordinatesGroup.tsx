import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/store/searchStore";

export const CoordinatesGroup = () => {
  const { currentCity, setCurrentCity } = useSearchStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    coordinateType: "lat" | "lon"
  ) => {
    const value = parseFloat(e.target.value);
    const currentLatValue = currentCity?.lat || 0;
    const currentLonValue = currentCity?.lon || 0;

    setCurrentCity({
      lat: currentLatValue,
      lon: currentLonValue,
      name: "",
      country: "",
      [coordinateType]: value,
    });
  };

  return (
    <div className="flex flex-row pt-2 md:col-span-2 gap-4">
      <div>
        <Label className="mb-1.5">Latitude</Label>
        <Input
          type="number"
          placeholder="Latitude"
          step="0.01"
          onChange={(e) => handleChange(e, "lat")}
          value={currentCity?.lat}
        />
      </div>
      <div>
        <Label className="mb-1.5">Longitude</Label>
        <Input
          type="number"
          placeholder="Longitude"
          step="0.01"
          onChange={(e) => handleChange(e, "lon")}
          value={currentCity?.lon}
        />
      </div>
    </div>
  );
};
