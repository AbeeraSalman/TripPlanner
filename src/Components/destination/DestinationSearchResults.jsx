import { Link } from "react-router-dom";

export default function DestinationSearchResults({ status, results, error, onRetry }) {
  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return <p className="mt-4 text-sm text-slate-500">Loading destinations...</p>;
  }

  if (status === "error") {
    return (
      <div className="mt-4 text-sm text-red-600">
        <p>Unable to load destinations.</p>
        <button
          onClick={onRetry}
          className="mt-1 rounded border border-red-300 px-3 py-1 text-xs font-medium hover:bg-red-50"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "success" && results.length === 0) {
    return (
      <div className="mt-4 text-sm text-slate-500">
        <p>No destinations found.</p>
        <p>Try another search.</p>
      </div>
    );
  }

  return (
    <ul className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200">
      {results.map((place) => (
        <li key={place.id}>
          <Link
            to={`/destinations/${place.id}`}
            state={place}
            className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-slate-50"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{place.name}</p>
              <p className="text-xs text-slate-500">
                {[place.admin1, place.country].filter(Boolean).join(", ")}
              </p>
            </div>
            <span className="text-slate-300">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}