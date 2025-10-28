import type { CitySuggestion } from "@/components/searchForm/components/citySearcher/types/citySearcher.types";
import { create } from "zustand";

interface SearchState {
  currentCity: CitySuggestion | null;
  currentCardCity: CitySuggestion | null;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setCurrentCity: (city: CitySuggestion | null) => void;
  setCurrentCardCity: (city: CitySuggestion | null) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  currentCity: null,
  startDate: new Date(),
  endDate: undefined,
  currentCardCity: null,

  setCurrentCity: (city) => set({ currentCity: city }),
  setCurrentCardCity: (city) => set({ currentCardCity: city }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
