import { useState } from "react";
import { useDestinationSearch } from "../hooks/useDestinationSearch";
import DestinationSearchBar from "../Components/destination/DestinationSearchBar";
import DestinationSearchResults from "../Components/destination/DestinationSearchResults";

const QUICK_SEARCHES = ["London", "Paris", "Dubai", "Tokyo", "Istanbul", "New York"];

export default function Destinations() {
  const [query, setQuery] = useState("");
  const { results, status, error, retry } = useDestinationSearch(query);
  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 px-4 py-14 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Search Destinations</h1>
        <p className="mt-2 text-sm text-indigo-100 sm:text-base">Find any city in the world and jump straight into planning.</p>
        <div className="mt-6 flex justify-center">
          <DestinationSearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-8">
        {isSearching ? (
          <DestinationSearchResults status={status} results={results} error={error} onRetry={retry} />
        ) : (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Quick searches</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCHES.map((city) => (
                <button
                  key={city}
                  onClick={() => setQuery(city)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}