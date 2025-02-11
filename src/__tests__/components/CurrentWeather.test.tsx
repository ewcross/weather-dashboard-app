import { CurrentWeather } from "@/components/CurrentWeather";
import { CurrentWeatherData } from "@/lib/schemas/openWeatherApi";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const TIMESTAMP = 1707729600;
const DATE_STRING = "Monday, 12 Feb";

jest.mock("../../lib/utils", () => ({
  getRoundedTemp: jest.fn((temp) => Math.round(temp)),
  getDateString: jest.fn(() => DATE_STRING),
  getImageUrl: jest.fn(() => "/mock-image.png"),
  firstLetterCaps: jest.fn(
    (text) => text.charAt(0).toUpperCase() + text.slice(1)
  ),
}));

const mockWeatherData: CurrentWeatherData = {
  dt: TIMESTAMP,
  temp: 18.3,
  weather: [
    {
      id: 100,
      description: "clear sky",
      icon: "01d",
    },
  ],
};

const multiConditionWeatherData: CurrentWeatherData = {
  dt: TIMESTAMP,
  temp: 18.3,
  weather: [
    {
      id: 100,
      description: "clear sky",
      icon: "01d",
    },
    {
      id: 200,
      description: "few clouds",
      icon: "02d",
    },
  ],
};

describe("CurrentWeather Component", () => {
  test("renders correctly with required props", () => {
    render(<CurrentWeather name="London" weatherData={mockWeatherData} />);

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("18°")).toBeInTheDocument();
    expect(screen.getByText("Monday, 12 Feb")).toBeInTheDocument();
    expect(screen.getByText("Clear sky")).toBeInTheDocument();
    expect(screen.getByAltText("clear sky")).toBeInTheDocument();
  });

  test("renders state if provided", () => {
    render(
      <CurrentWeather
        name="Los Angeles"
        state="CA"
        weatherData={mockWeatherData}
      />
    );

    expect(screen.getByText("Los Angeles, CA")).toBeInTheDocument();
  });

  test("renders multiple weather conditions correctly", () => {
    render(
      <CurrentWeather name="Berlin" weatherData={multiConditionWeatherData} />
    );

    expect(screen.getByText("Clear sky, few clouds")).toBeInTheDocument();
  });
});
