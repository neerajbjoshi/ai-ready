export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  visibility: number;
}

export interface ForecastItem {
  dt: number;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
}

export interface CityResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
