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
    <ul className="mt-4 divide-y divide-slate-200">
      {results.map((place) => (
        <li key={`${place.latitude}-${place.longitude}`} className="py-2">
          <p className="text-sm font-medium text-slate-900">{place.name}</p>
          <p className="text-xs text-slate-500">
            {[place.admin1, place.country].filter(Boolean).join(", ")}
          </p>
        </li>
      ))}
    </ul>
  );
}