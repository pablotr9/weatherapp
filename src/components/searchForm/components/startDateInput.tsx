import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchStore } from "@/store/searchStore";

export const StartDateInput = () => {
  const { startDate, setStartDate } = useSearchStore();

  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(new Date().getDate() + 7);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return (
    <>
      <Label className="mb-1.5">Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            {startDate ? format(startDate, "PPP") : <span>Select a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            disabled={(date) => date > sevenDaysFromNow || date < oneMonthAgo}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
