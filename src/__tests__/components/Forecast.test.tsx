import { Forecast } from "@/components/Forecast"; // Ensure correct import path
import { DailyWeatherData } from "@/lib/schemas/openWeatherApi";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("../../lib/utils", () => ({
  getDayString: jest.fn((dt) => `Day ${dt}`),
  getRoundedTemp: jest.fn((temp) => Math.round(temp)),
  getImageUrl: jest.fn(() => `/mock-image.png`),
}));

const mockForecastData: DailyWeatherData = [
  {
    dt: 0,
    temp: { day: 20, night: 10 },
    weather: [{ description: "Sunny", icon: "01d" }],
  },
  {
    dt: 1,
    temp: { day: 22, night: 12 },
    weather: [{ description: "Cloudy", icon: "02d" }],
  },
  {
    dt: 2,
    temp: { day: 18, night: 9 },
    weather: [{ description: "Rainy", icon: "10d" }],
  },
  {
    dt: 3,
    temp: { day: 25, night: 15 },
    weather: [{ description: "Stormy", icon: "11d" }],
  },
  {
    dt: 4,
    temp: { day: 21, night: 11 },
    weather: [{ description: "Windy", icon: "50d" }],
  },
  {
    dt: 5,
    temp: { day: 19, night: 8 },
    weather: [{ description: "Snowy", icon: "13d" }],
  },
  {
    dt: 6,
    temp: { day: 23, night: 14 },
    weather: [{ description: "Foggy", icon: "03d" }],
  },
  {
    dt: 7,
    temp: { day: 26, night: 16 },
    weather: [{ description: "Clear", icon: "01n" }],
  },
];

describe("Forecast Component", () => {
  test("renders initial 3-day forecast, starting from the second entry", () => {
    render(<Forecast forescast={mockForecastData} />);

    expect(screen.getByText("Show full week forecast")).toBeInTheDocument();

    for (let i = 1; i <= 3; i++) {
      expect(screen.getByText(`Day ${i}`)).toBeInTheDocument();
      expect(
        screen.getByText(
          `${Math.round(mockForecastData[i].temp.day)}° / ${Math.round(
            mockForecastData[i].temp.night
          )}°`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(mockForecastData[i].weather[0].description)
      ).toBeInTheDocument();
    }

    for (let i = 4; i <= 8; i++) {
      expect(screen.queryByText(`Day ${i}`)).not.toBeInTheDocument();
    }
  });

  test("toggles to full week forecast", () => {
    render(<Forecast forescast={mockForecastData} />);

    const toggleButton = screen.getByText("Show full week forecast");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Hide full week forecast")).toBeInTheDocument();

    for (let i = 1; i <= 7; i++) {
      expect(screen.getByText(`Day ${i}`)).toBeInTheDocument();
    }
  });

  test("toggles back to 3-day forecast", () => {
    render(<Forecast forescast={mockForecastData} />);

    const toggleButton = screen.getByText("Show full week forecast");
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);

    expect(screen.getByText("Show full week forecast")).toBeInTheDocument();

    for (let i = 1; i <= 3; i++) {
      expect(screen.getByText(`Day ${i}`)).toBeInTheDocument();
    }

    for (let i = 4; i <= 8; i++) {
      expect(screen.queryByText(`Day ${i}`)).not.toBeInTheDocument();
    }
  });
});
