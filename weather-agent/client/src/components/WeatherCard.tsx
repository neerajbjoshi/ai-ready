import { WeatherData } from '../types';

interface Props {
  data: WeatherData;
}

function formatTime(unix: number): string {
  return new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function WeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2 className="city-title">{data.city}, {data.country}</h2>
          <p className="weather-desc">{capitalize(data.description)}</p>
        </div>
        <img src={iconUrl} alt={data.description} className="weather-icon" />
      </div>

      <div className="temp-display">
        <span className="temp-main">{data.temperature}°C</span>
        <span className="temp-feels">Feels like {data.feelsLike}°C</span>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">💧 Humidity</span>
          <span className="detail-value">{data.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">💨 Wind</span>
          <span className="detail-value">{data.windSpeed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">👁 Visibility</span>
          <span className="detail-value">{(data.visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">🌅 Sunrise</span>
          <span className="detail-value">{formatTime(data.sunrise)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">🌇 Sunset</span>
          <span className="detail-value">{formatTime(data.sunset)}</span>
        </div>
      </div>
    </div>
  );
}
