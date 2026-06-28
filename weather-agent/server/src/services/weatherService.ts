import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

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

export async function searchCities(query: string): Promise<CityResult[]> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const response = await axios.get(`${GEO_URL}/direct`, {
    params: { q: query, limit: 5, appid: apiKey },
  });
  return response.data.map((item: any) => ({
    name: item.name,
    country: item.country,
    state: item.state,
    lat: item.lat,
    lon: item.lon,
  }));
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: apiKey, units: 'metric' },
  });
  const d = response.data;
  return {
    city: d.name,
    country: d.sys.country,
    temperature: Math.round(d.main.temp),
    feelsLike: Math.round(d.main.feels_like),
    humidity: d.main.humidity,
    windSpeed: d.wind.speed,
    description: d.weather[0].description,
    icon: d.weather[0].icon,
    sunrise: d.sys.sunrise,
    sunset: d.sys.sunset,
    visibility: d.visibility,
  };
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon, appid: apiKey, units: 'metric' },
  });
  const d = response.data;
  return {
    city: d.name,
    country: d.sys.country,
    temperature: Math.round(d.main.temp),
    feelsLike: Math.round(d.main.feels_like),
    humidity: d.main.humidity,
    windSpeed: d.wind.speed,
    description: d.weather[0].description,
    icon: d.weather[0].icon,
    sunrise: d.sys.sunrise,
    sunset: d.sys.sunset,
    visibility: d.visibility,
  };
}

export async function getForecast(city: string): Promise<ForecastItem[]> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: apiKey, units: 'metric', cnt: 40 },
  });

  // Return one entry per day (noon readings)
  const items: ForecastItem[] = response.data.list
    .filter((item: any) => item.dt_txt.includes('12:00:00'))
    .slice(0, 5)
    .map((item: any) => ({
      dt: item.dt,
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
    }));

  return items;
}
