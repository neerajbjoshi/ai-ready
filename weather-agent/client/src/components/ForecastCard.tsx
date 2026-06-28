import { ForecastItem } from '../types';

interface Props {
  forecast: ForecastItem[];
}

function formatDay(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ForecastCard({ forecast }: Props) {
  return (
    <div className="forecast-card">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((item) => (
          <div key={item.dt} className="forecast-item">
            <span className="forecast-day">{formatDay(item.dt)}</span>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
              className="forecast-icon"
            />
            <span className="forecast-temp">{item.temperature}°C</span>
            <span className="forecast-desc">{capitalize(item.description)}</span>
            <span className="forecast-humidity">💧 {item.humidity}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
