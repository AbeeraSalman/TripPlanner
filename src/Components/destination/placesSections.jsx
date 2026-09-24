import { AlertCircle, ArrowRight, MapPin, MapPinned } from "lucide-react";
import { usePlaces } from "../../hooks/usePlaces";
import { usePlaceImage } from "../../hooks/usePlaceImage";
import SaveButton from "../common/saveButton";

function formatDistance(meters) {
  if (meters == null) return null;
  return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km`;
}

function mapsUrlFor(place) {
  if (place.latitude == null || place.longitude == null) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
}

/* Full-bleed photo card styled like the trending destination cards:
   gradient base → photo (Wikipedia image API) → scrim → overlaid name/address,
   distance badge, save button and arrow circle. The whole card is a map link. */
function PlaceCard({ place, type }) {
  const { imageUrl, status } = usePlaceImage(place);
  const distance = formatDistance(place.distance);

  return (
    <div className="group relative h-48 overflow-hidden rounded-3xl border border-slate-200/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 @xl:h-56">
      {/* Gradient base — also the fallback when no photo exists (like New York above) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-400" />

      {status === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-slate-200/80 dark:bg-slate-700/70" />
      )}

      {status === "success" && (
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {(status === "empty" || status === "error") && (
        <span className="absolute inset-0 flex items-center justify-center text-white/40">
          <MapPin size={44} />
        </span>
      )}

      {/* Readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/85 via-indigo-950/15 to-transparent" />

      {/* Name + address + arrow circle */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-white">{place.name}</h3>
          <p className="mt-0.5 truncate text-xs text-white/80">{place.address}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-indigo-700 shadow-lg transition-transform group-hover:translate-x-0.5">
          <ArrowRight size={16} />
        </span>
      </div>

      {/* Whole-card link → opens the place on the map */}
      <a
        href={mapsUrlFor(place)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${place.name} on the map`}
        className="absolute inset-0 z-20"
      />

      {/* Save — sits above the card link (same spot as the "Exploring" badge) */}
      <div className="absolute left-3 top-3 z-30">
        <SaveButton
          item={{
            id: place.id,
            type,
            name: place.name,
            subtitle: place.address,
            latitude: place.latitude,
            longitude: place.longitude,
          }}
          size={16}
        />
      </div>

      {/* Distance — same glass style as the temperature badge */}
      {distance && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-white/85 px-2.5 py-1 text-xs font-bold text-slate-700 backdrop-blur dark:bg-slate-900/70 dark:text-slate-200">
          {distance}
        </span>
      )}
    </div>
  );
}

// title/icon/category let this one component serve attractions, restaurants, and hotels.
// `limit` keeps narrow placements (All tab, details sidebar) compact; default shows 6 cards.
export default function PlacesSection({ title, icon: Icon, latitude, longitude, category, limit = 6 }) {
  const { places, status, retry } = usePlaces(latitude, longitude, category);
  const visible = places.slice(0, limit);
  const type = title.slice(0, -1).toLowerCase();
  const showEmpty = status === "empty" || (status === "success" && visible.length === 0);

  return (
    <div className="@container rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Section heading */}
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-sm shadow-indigo-500/30">
          <Icon size={15} />
        </span>
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">{title}</h2>
        {status === "success" && visible.length > 0 && (
          <span className="ml-auto text-xs font-semibold text-slate-400">{visible.length} nearby</span>
        )}
      </div>

      {status === "loading" && (
        <div className="grid grid-cols-1 gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
          {Array.from({ length: Math.min(limit, 3) }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-700 @xl:h-56"
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle size={16} />
            <p className="text-sm font-medium">Unable to load {title.toLowerCase()}.</p>
          </div>
          <button
            onClick={retry}
            className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/50"
          >
            Retry
          </button>
        </div>
      )}

      {showEmpty && (
        <p className="flex items-center gap-2 text-sm text-slate-400">
          <MapPinned size={16} />
          No {title.toLowerCase()} found nearby.
        </p>
      )}

      {status === "success" && visible.length > 0 && (
        <div className="grid grid-cols-1 gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
          {visible.map((place) => (
            <PlaceCard key={place.id} place={place} type={type} />
          ))}
        </div>
      )}
    </div>
  );
}