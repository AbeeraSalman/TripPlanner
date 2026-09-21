import { useEffect, useState, useCallback } from "react";
import { CloudSun, Wind, AlertCircle } from "lucide-react";
import { getCurrentWeather } from "../../Services/weatherApi";

export default function WeatherCard({ latitude, longitude }) {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const loadWeather = useCallback(() => {
    if (latitude == null || longitude == null) return;
    setStatus("loading");
    getCurrentWeather(latitude, longitude)
      .then((data) => {
        setWeather(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [latitude, longitude]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <CloudSun size={16} className="text-indigo-500" />
        Current Weather
      </h2>

      {status === "loading" && (
        <div className="space-y-2">
          <div className="h-9 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle size={16} />
            <p className="text-sm font-medium">Weather unavailable.</p>
          </div>
          <button
            onClick={loadWeather}
            className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            Retry
          </button>
        </div>
      )}

      {status === "success" && weather && (
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-slate-900">
            {Math.round(weather.temperature)}°C
          </span>
          <span className="flex items-center gap-1 text-sm text-slate-500">
            <Wind size={14} />
            {weather.windspeed} km/h
          </span>
        </div>
      )}
    </div>
  );
}