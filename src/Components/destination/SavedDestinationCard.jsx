import { useEffect, useState } from "react";
import { AlertCircle, BookOpen, CloudSun, MapPin, Wind } from "lucide-react";
import { searchDestinations } from "../../Services/geocodingApi";
import { getCurrentWeather } from "../../Services/weatherApi";
import { useWikiSummary } from "../../hooks/useVikiSummary";
import { usePreferences } from "../../hooks/usePreferences";

export default function SavedDestinationCard({ item, onRemove }) {
  const [place, setPlace] = useState(item);
  const [locationStatus, setLocationStatus] = useState(
    item.latitude != null && item.longitude != null ? "ready" : "loading"
  );
  const [weather, setWeather] = useState(null);
  const { preferences } = usePreferences();
  const { summary, status: wikiStatus } = useWikiSummary(item.name, item.admin1 || item.subtitle);

  useEffect(() => {
    if (item.latitude != null && item.longitude != null) return;

    let active = true;
    searchDestinations(item.name)
      .then((results) => {
        if (!active) return;
        const match = results[0];
        if (match) {
          setPlace((current) => ({ ...current, ...match }));
          setLocationStatus("ready");
        } else {
          setLocationStatus("error");
        }
      })
      .catch(() => {
        if (active) setLocationStatus("error");
      });

    return () => {
      active = false;
    };
  }, [item]);

  useEffect(() => {
    if (place.latitude == null || place.longitude == null) return;

    getCurrentWeather(place.latitude, place.longitude)
      .then(setWeather)
      .catch(() => setWeather(null));
  }, [place.latitude, place.longitude]);

  const displayTemp = preferences.temperatureUnit === "F"
    ? Math.round(weather?.temperature * 9 / 5 + 32)
    : Math.round(weather?.temperature);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm sm:col-span-2">
      {wikiStatus === "success" && summary?.imageUrl ? (
        <img src={summary.imageUrl} alt={item.name} className="h-40 w-full object-cover sm:hidden" />
      ) : (
        <div className="flex h-32 items-center justify-center bg-slate-100 text-slate-300 sm:hidden">
          <MapPin size={32} />
        </div>
      )}

      <div className="grid gap-4 p-4 sm:grid-cols-[180px_1fr_190px] sm:items-center">
        {wikiStatus === "success" && summary?.imageUrl ? (
          <img src={summary.imageUrl} alt={item.name} className="hidden h-32 w-full rounded-lg object-cover sm:block" />
        ) : (
          <div className="hidden h-32 items-center justify-center rounded-lg bg-slate-100 text-slate-300 sm:flex">
            <MapPin size={32} />
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
              <p className="text-sm text-slate-500">{item.subtitle}</p>
            </div>
            <button onClick={onRemove} className="shrink-0 text-xs font-medium text-red-500 hover:underline">
              Remove
            </button>
          </div>

          <div className="mt-3">
            <h4 className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <BookOpen size={15} className="text-indigo-500" />
              About {item.name}
            </h4>
            {wikiStatus === "loading" && <div className="h-12 animate-pulse rounded bg-slate-100" />}
            {wikiStatus === "success" && summary?.description && (
              <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{summary.description}</p>
            )}
            {wikiStatus === "error" && (
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <AlertCircle size={15} /> Description unavailable.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <CloudSun size={15} className="text-indigo-500" />
            Current Weather
          </h4>
          {locationStatus === "loading" && <div className="h-10 animate-pulse rounded bg-slate-200" />}
          {locationStatus === "error" && <p className="text-xs text-slate-400">Weather location unavailable.</p>}
          {locationStatus === "ready" && weather && (
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">{displayTemp}°{preferences.temperatureUnit}</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Wind size={13} /> {weather.windspeed} km/h
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
