import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CloudSun, Droplets, Wind, Thermometer, Search } from 'lucide-react';
import './Weather.css';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    main: string;
    icon: string;
  }>;
  wind?: { speed: number };
}

export const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('Colombo');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY ?? '';

  const getWeather = async () => {
    if (!API_KEY) {
      setError('Add VITE_OPENWEATHER_API_KEY in .env');
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError('City not found. Try another name.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-cyan-500 to-blue-600">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Sri Lanka Weather</h2>
          <p className="text-blue-100 mb-6">Plan your trip with live weather conditions</p>

          <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter city (e.g. Colombo, Kandy, Galle)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 min-w-[180px] px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-colors disabled:opacity-60"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </form>
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-amber-200 bg-white/10 rounded-lg py-3 px-4 max-w-md mx-auto mb-6"
          >
            {error}
          </motion.p>
        )}

        {loading && !weather && (
          <div className="text-center text-white/80 py-8">Loading weather…</div>
        )}

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="login-box bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">{weather.name}</h3>
              <CloudSun className="w-10 h-10" />
            </div>
            <div className="text-5xl font-bold mb-2 text-center">{Math.round(weather.main.temp)}°C</div>
            <p className="text-center capitalize text-lg mb-6 text-white/90">
              {weather.weather[0].description}
            </p>
            <p className="text-center text-white/70 text-sm mb-6">
              Feels like {Math.round(weather.main.feels_like)}°C
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm">Humidity</span>
                </div>
                <div className="text-xl font-semibold">{weather.main.humidity}%</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Wind className="w-5 h-5" />
                  <span className="text-sm">Wind</span>
                </div>
                <div className="text-xl font-semibold">
                  {weather.wind ? `${Math.round(weather.wind.speed)} m/s` : '—'}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-blue-100 text-sm"
        >
          Live data from OpenWeatherMap
        </motion.p>
      </div>
    </section>
  );
};
