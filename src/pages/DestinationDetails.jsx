import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getCurrentWeather } from "../Services/weatherApi";

export default function DestinationDetails() {
  const { destinationId } = useParams();
  const { state: place } = useLocation();

  const [weather, setWeather] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState("idle"); // idle | loading | success | error

  const loadWeather = () => {
    if (!place) return;

    setWeatherStatus("loading");
    getCurrentWeather(place.latitude, place.longitude)
      .then((data) => {
        setWeather(data);
        setWeatherStatus("success");
      })
      .catch(() => {
        setWeatherStatus("error");
      });
  };

  useEffect(() => {
    loadWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationId]);

  // No place data — someone landed here directly via URL/refresh without search context
  if (!place) {
    return (
      <div className="px-4 py-6 text-center">
        <p className="text-sm text-slate-600">
          We don't have details for this destination yet.
        </p>
        <Link to="/destinations" className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline">
          ← Back to search
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header — renders immediately regardless of weather's status */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-10 text-white">
        <Link to="/destinations" className="text-sm text-blue-100 hover:text-white">
          ← Back to search
        </Link>
        <h1 className="mt-2 text-3xl font-semibold">{place.name}</h1>
        <p className="text-blue-100">
          {[place.admin1, place.country].filter(Boolean).join(", ")}
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Weather card — fully isolated loading/error/success, doesn't affect the header above */}
        <div className="max-w-sm rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Current Weather
          </h2>

          {weatherStatus === "loading" && (
            <p className="text-sm text-slate-500">Loading weather...</p>
          )}

          {weatherStatus === "error" && (
            <div>
              <p className="text-sm text-red-600">Weather unavailable.</p>
              <button
                onClick={loadWeather}
                className="mt-1 rounded border border-red-300 px-3 py-1 text-xs font-medium hover:bg-red-50"
              >
                Retry
              </button>
            </div>
          )}

          {weatherStatus === "success" && weather && (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-900">
                {Math.round(weather.temperature)}°C
              </span>
              <span className="text-sm text-slate-500">
                Wind {weather.windspeed} km/h
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}