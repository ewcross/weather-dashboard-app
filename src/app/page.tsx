import { WeatherDashboard } from "@/components/WeatherDashboard";
import { WeatherProvider } from "./context/WeatherContext";

export default function Page() {
  return (
    <WeatherProvider>
      <main className="mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-950">
          Weather Dashboard
        </h1>
        <WeatherDashboard />
      </main>
    </WeatherProvider>
  );
}
