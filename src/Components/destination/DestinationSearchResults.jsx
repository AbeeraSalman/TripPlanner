import { Link } from "react-router-dom";
import { MapPin, ChevronRight, AlertCircle, SearchX } from "lucide-react";

function ResultSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-4">
      <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-200" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}

export default function DestinationSearchResults({ status, results, error, onRetry }) {
  if (status === "idle") return null;

  if (status === "loading") {
    return (
      <div className="mt-4 space-y-2">
        {[1, 2, 3].map((i) => (
          <ResultSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-4 flex flex-col items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-4">
        <div className="flex items-center gap-2 text-red-700">
          <AlertCircle size={18} />
          <p className="text-sm font-medium">Unable to load destinations.</p>
        </div>
        <button
          onClick={onRetry}
          className="rounded-full border border-red-300 bg-white px-4 py-1.5 text-xs font-semibold text-red-700 shadow-sm hover:bg-red-50"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "success" && results.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 py-10 text-center">
        <SearchX size={28} className="text-slate-300" />
        <p className="text-sm font-medium text-slate-600">No destinations found.</p>
        <p className="text-xs text-slate-400">Try another search.</p>
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {results.map((place) => (
        <li key={place.id}>
          <Link
            to={`/destinations/${place.id}`}
            state={place}
            className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <MapPin size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{place.name}</p>
              <p className="truncate text-xs text-slate-500">
                {[place.admin1, place.country].filter(Boolean).join(", ")}
              </p>
            </div>
            <ChevronRight
              size={18}
              className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-400"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}