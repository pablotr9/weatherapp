import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useSearchStore } from "@/store/searchStore";
import { useWeatherCardStatus } from "../hooks/useWeatherCardStatus.hook";
import { fromPartial } from "@total-typescript/shoehorn";
import { WeatherCard } from "../weatherCard";

vi.mock("@/hooks/useWeatherData");
vi.mock("@/store/searchStore");
vi.mock("../hooks/useWeatherCardStatus.hook");

vi.mock("./components/skeletonCard", () => ({
  SkeletonCard: () => <div data-testid="skeleton-card">Loading...</div>,
}));
vi.mock("./components/emptyCard", () => ({
  EmptyCard: () => <div data-testid="empty-card">No data</div>,
}));
vi.mock("./components/errorCard", () => ({
  ErrorCard: ({ error }: { error: Error }) => (
    <div data-testid="error-card">Error: {error.message}</div>
  ),
}));

const mockUseWeatherData = vi.mocked(useWeatherData);
const mockUseSearchStore = vi.mocked(useSearchStore);
const mockUseWeatherCardStatus = vi.mocked(useWeatherCardStatus);

const mockSetStartDate = vi.fn();

const defaultStoreState = {
  currentCardCity: { name: "Madrid", lat: 40.4167, lon: -3.70325 },
  startDate: new Date("2024-11-27T12:00:00Z"),
  setStartDate: mockSetStartDate,
};

const defaultWeatherStatusState = {
  searchParams: {
    latitude: 40.4167,
    longitude: -3.70325,
    startDate: new Date("2024-11-27T12:00:00Z"),
  },
  showNextButton: true,
  showPreviousButton: true,
};

const defaultWeatherData = {
  description: "Clear sky",
  weather: {
    temperature: 22.5,
    precipitation: 0.1,
    windSpeed: 15.3,
  },
};

describe("WeatherCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseSearchStore.mockReturnValue(defaultStoreState);
    mockUseWeatherCardStatus.mockReturnValue(defaultWeatherStatusState);
    mockUseWeatherData.mockReturnValue(
      fromPartial({
        data: defaultWeatherData,
        isFetching: false,
        isError: false,
        error: null,
      })
    );
  });

  it("should render SkeletonCard when isFetching is true", () => {
    mockUseWeatherData.mockReturnValue(
      fromPartial({
        data: undefined,
        isFetching: true,
        isError: false,
        error: null,
      })
    );

    render(<WeatherCard />);
    expect(screen.getByTestId("skeleton-card")).toBeInTheDocument();
  });

  it("should render ErrorCard when isError is true", () => {
    const testError = new Error("Failed to fetch");
    mockUseWeatherData.mockReturnValue(
      fromPartial({
        data: undefined,
        isFetching: false,
        isError: true,
        error: testError,
      })
    );

    render(<WeatherCard />);
    expect(screen.getByTestId("error-card")).toBeInTheDocument();
  });

  it("should render EmptyCard if data is null", () => {
    mockUseWeatherData.mockReturnValue(
      fromPartial({
        data: undefined,
        isFetching: false,
        isError: false,
        error: null,
      })
    );

    render(<WeatherCard />);
    expect(screen.getByTestId("empty-card")).toBeInTheDocument();
  });

  it("should render EmptyCard if currentCardCity is null", () => {
    mockUseSearchStore.mockReturnValue({
      ...defaultStoreState,
      currentCardCity: null,
    });

    render(<WeatherCard />);
    expect(screen.getByTestId("empty-card")).toBeInTheDocument();
  });

  it("should render weather data correctly on success", () => {
    render(<WeatherCard />);

    expect(
      screen.getByText(defaultStoreState.currentCardCity.name)
    ).toBeInTheDocument();
    expect(screen.getByText("2024-11-27")).toBeInTheDocument();
    expect(
      screen.getByText(defaultWeatherData.description)
    ).toBeInTheDocument();
    expect(screen.getByText("22.5°C")).toBeInTheDocument();
    expect(screen.getByText("Precipitation: 0.1 mm")).toBeInTheDocument();
    expect(screen.getByText("Wind: 15.3 km/h")).toBeInTheDocument();
  });

  it("should render 'Selected coordinates' if city has no name", () => {
    mockUseSearchStore.mockReturnValue({
      ...defaultStoreState,
      currentCardCity: { lat: 40.4167, lon: -3.70325 },
    });

    render(<WeatherCard />);
    expect(screen.getByText("Selected coordinates")).toBeInTheDocument();
  });

  it("should call setStartDate with next day on 'Next day' click", () => {
    render(<WeatherCard />);

    const nextButton = screen.getByRole("button", { name: /Next day/i });
    fireEvent.click(nextButton);

    const expectedDate = new Date("2024-11-28T12:00:00Z");

    expect(mockSetStartDate).toHaveBeenCalledTimes(1);
    expect(mockSetStartDate).toHaveBeenCalledWith(expectedDate);
  });

  it("should call setStartDate with previous day on 'Previous day' click", () => {
    render(<WeatherCard />);

    const prevButton = screen.getByRole("button", { name: /Previous day/i });
    fireEvent.click(prevButton);

    const expectedDate = new Date("2024-11-26T12:00:00Z");

    expect(mockSetStartDate).toHaveBeenCalledTimes(1);
    expect(mockSetStartDate).toHaveBeenCalledWith(expectedDate);
  });

  it("should not show navigation buttons if hooks return false", () => {
    mockUseWeatherCardStatus.mockReturnValue({
      ...defaultWeatherStatusState,
      showNextButton: false,
      showPreviousButton: false,
    });

    render(<WeatherCard />);

    expect(
      screen.queryByRole("button", { name: /Previous day/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Next day/i })
    ).not.toBeInTheDocument();
  });
});
