import { Router, Request, Response } from 'express';
import {
  getCurrentWeather,
  getWeatherByCoords,
  getForecast,
  searchCities,
} from '../services/weatherService';

const router = Router();

// GET /api/weather/current?city=Mumbai
router.get('/current', async (req: Request, res: Response) => {
  const { city } = req.query;
  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'city query param is required' });
  }
  try {
    const data = await getCurrentWeather(city);
    return res.json(data);
  } catch (err: any) {
    const status = err.response?.status === 404 ? 404 : 500;
    return res.status(status).json({ error: err.response?.data?.message || 'Failed to fetch weather' });
  }
});

// GET /api/weather/current/coords?lat=19.07&lon=72.87
router.get('/current/coords', async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon query params are required' });
  }
  try {
    const data = await getWeatherByCoords(parseFloat(lat as string), parseFloat(lon as string));
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch weather by coordinates' });
  }
});

// GET /api/weather/forecast?city=Mumbai
router.get('/forecast', async (req: Request, res: Response) => {
  const { city } = req.query;
  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'city query param is required' });
  }
  try {
    const data = await getForecast(city);
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

// GET /api/weather/search?q=Mum
router.get('/search', async (req: Request, res: Response) => {
  const { q } = req.query;
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'q query param is required' });
  }
  try {
    const data = await searchCities(q);
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to search cities' });
  }
});

export default router;
