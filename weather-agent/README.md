# Weather Agent

A full-stack MERN weather app that shows real-time weather and a 5-day forecast for any city worldwide.

**Stack:** React + TypeScript (Vite) · Node.js + Express + TypeScript · OpenWeatherMap API

---

## Prerequisites

- Node.js 18+
- Free API key from [openweathermap.org](https://openweathermap.org/api) (Current Weather + Forecast endpoints)

---

## Setup

### 1. Get your API key
Sign up at https://openweathermap.org → go to **API keys** → copy your key.

### 2. Configure the server
```bash
cd server
cp .env.example .env
# Edit .env and set OPENWEATHER_API_KEY=your_key_here
```

### 3. Install & run the backend
```bash
cd server
npm install
npm run dev
# Runs on http://localhost:5000
```

### 4. Install & run the frontend
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:3000
```

Open http://localhost:3000 in your browser.

---

## Project Structure

```
weather-agent/
├── server/                  # Express + TypeScript backend
│   ├── src/
│   │   ├── app.ts           # Express app setup
│   │   ├── server.ts        # Entry point
│   │   ├── routes/
│   │   │   └── weather.ts   # API routes
│   │   └── services/
│   │       └── weatherService.ts  # OpenWeatherMap calls
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── client/                  # React + TypeScript frontend
    ├── src/
    │   ├── App.tsx           # Root component
    │   ├── api.ts            # API client
    │   ├── types.ts          # Shared types
    │   ├── index.css         # Global styles
    │   └── components/
    │       ├── SearchBar.tsx  # City search with autocomplete
    │       ├── WeatherCard.tsx # Current weather display
    │       └── ForecastCard.tsx # 5-day forecast
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather/current?city=Mumbai` | Current weather by city name |
| GET | `/api/weather/current/coords?lat=19.07&lon=72.87` | Current weather by coordinates |
| GET | `/api/weather/forecast?city=Mumbai` | 5-day forecast |
| GET | `/api/weather/search?q=Mum` | City autocomplete suggestions |
| GET | `/health` | Health check |

---

## Features

- 🔍 City search with live autocomplete
- 📍 Auto-detects your location on first load (browser permission)
- 🌡 Current temperature, feels like, humidity, wind, visibility, sunrise/sunset
- 📅 5-day forecast at noon readings
- 🌍 Works for any city globally
