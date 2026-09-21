import { AlertCircle, MapPinned } from "lucide-react";
import { usePlaces } from "../../hooks/usePlaces";

// title/icon/category let this one component serve attractions, restaurants, and hotels
export default function PlacesSection({ title, icon: Icon, latitude, longitude, category }) {
  const { places, status, retry } = usePlaces(latitude, longitude, category);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Icon size={16} className="text-indigo-500" />
        {title}
      </h2>

      {status === "loading" && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle size={16} />
            <p className="text-sm font-medium">Unable to load {title.toLowerCase()}.</p>
          </div>
          <button
            onClick={retry}
            className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            Retry
          </button>
        </div>
      )}

      {status === "empty" && (
        <p className="flex items-center gap-2 text-sm text-slate-400">
          <MapPinned size={16} />
          No {title.toLowerCase()} found nearby.
        </p>
      )}

      {status === "success" && (
        <ul className="space-y-2">
          {places.slice(0, 5).map((place) => (
            <li key={place.id} className="flex items-start justify-between gap-2 text-sm">
              <span className="font-medium text-slate-800">{place.name}</span>
              {place.distance != null && (
                <span className="shrink-0 text-xs text-slate-400">
                  {Math.round(place.distance)}m
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}