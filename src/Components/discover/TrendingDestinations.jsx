import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { useDestinationPreview } from "../../hooks/useDestinationPreview";
import { usePreferences } from "../../hooks/usePreferences";
import { TRENDING_DESTINATIONS } from "../../utils/TrendingDestinations";

/* Full-bleed card: photo (or gradient fallback) with overlaid name + live temperature.
   memo: only the card whose isActive actually changed re-renders on selection. */
const TrendingCard = memo(function TrendingCard({ place, isActive, onSelect }) {
  const { data, status } = useDestinationPreview(place);
  const { preferences } = usePreferences();

  const temperature =
    data.temperature == null
      ? null
      : preferences.temperatureUnit === "F"
        ? Math.round((data.temperature * 9) / 5 + 32)
        : Math.round(data.temperature);

  return (
    <button
      type="button"
      onClick={() => onSelect(place)}
      aria-pressed={isActive}
      aria-label={`Explore ${place.name}`}
      className={`group relative block h-60 w-full overflow-hidden rounded-3xl border text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
        isActive
          ? "border-indigo-500 ring-2 ring-indigo-400/70"
          : "border-slate-200/60 shadow-sm dark:border-slate-700"
      }`}
    >
      {/* Gradient base shows while loading / when no photo exists */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-400" />

      {status === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-slate-200/80 dark:bg-slate-700/70" />
      )}

      {status === "success" && data.imageUrl && (
        <img
          src={data.imageUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/85 via-indigo-950/15 to-transparent" />

      {isActive && (
        <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Exploring
        </span>
      )}

      {temperature != null && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-bold backdrop-blur">
          {temperature}°{preferences.temperatureUnit}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-white">{place.name}</h3>
          <p className="mt-0.5 truncate text-xs text-white/80">
            {[place.admin1, place.country].filter(Boolean).join(", ")}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-indigo-700 shadow-lg transition-transform group-hover:translate-x-0.5">
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
});

export default function TrendingDestinations({ selectedId, onSelect }) {
  return (
    <section id="trending" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-4 pt-14">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">
          Trending now
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Popular destinations
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tap a city to instantly preview its weather, attractions, restaurants and hotels.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TRENDING_DESTINATIONS.map((place) => (
          <TrendingCard
            key={place.id}
            place={place}
            isActive={selectedId === place.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}