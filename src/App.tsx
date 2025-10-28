import "./App.css";
import { SearchForm } from "./components/searchForm/SearchForm";
import { WeatherCard } from "./components/weatherCard/weatherCard";

function App() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <div className="text-2xl font-semibold tracking-tight mb-6 left-0">
          Weather app
        </div>
        <SearchForm />
        <div className="h-[500px] mt-12">
          <WeatherCard />
        </div>
      </div>
    </>
  );
}

export default App;
