import axios from 'axios';
import { WeatherData, ForecastItem, CityResult } from './types';

const api = axios.create({ baseURL: '/api/weather' });

export const searchCities = (q: string): Promise<CityResult[]> =>
  api.get('/search', { params: { q } }).then(r => r.data);

export const getCurrentWeather = (city: string): Promise<WeatherData> =>
  api.get('/current', { params: { city } }).then(r => r.data);

export const getWeatherByCoords = (lat: number, lon: number): Promise<WeatherData> =>
  api.get('/current/coords', { params: { lat, lon } }).then(r => r.data);

export const getForecast = (city: string): Promise<ForecastItem[]> =>
  api.get('/forecast', { params: { city } }).then(r => r.data);
