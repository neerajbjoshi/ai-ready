import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { getCurrentWeather, getForecast, getWeatherByCoords } from './api';
import { WeatherData, ForecastItem } from './types';

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [w, f] = await Promise.all([getCurrentWeather(city), getForecast(city)]);
      setWeather(w);
      setForecast(f);
    } catch (err: any) {
      setError(err.response?.data?.error || 'City not found. Please try another.');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  // Try to get user's location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          setLoading(true);
          try {
            const w = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            const f = await getForecast(w.city);
            setWeather(w);
            setForecast(f);
          } catch {
            // Silent fail — user can search manually
          } finally {
            setLoading(false);
          }
        },
        () => {} // Permission denied — that's fine
      );
    }
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌤 Weather Agent</h1>
        <p className="app-subtitle">Real-time weather for any city across the globe</p>
      </header>

      <main className="app-main">
        <SearchBar onSelect={fetchWeather} loading={loading} />

        {loading && (
          <div className="loading">
            <div className="spinner" />
            <p>Fetching weather...</p>
          </div>
        )}

        {error && <div className="error-msg">⚠️ {error}</div>}

        {!loading && weather && (
          <>
            <WeatherCard data={weather} />
            {forecast.length > 0 && <ForecastCard forecast={forecast} />}
          </>
        )}

        {!loading && !weather && !error && (
          <div className="placeholder">
            <p>🌍 Search for a city to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
