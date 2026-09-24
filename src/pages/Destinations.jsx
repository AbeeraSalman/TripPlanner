import { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { useDestinationSearch } from "../hooks/useDestinationSearch";
import DestinationSearchResults from "../Components/destination/DestinationSearchResults";

const QUICK_SEARCHES = ["London", "Paris", "Dubai", "Tokyo", "Istanbul", "New York", "Lahore"];

export default function Destinations() {
  const [query, setQuery] = useState("");
  const { results, status, error, retry } = useDestinationSearch(query);
  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      {/* Search hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 px-4 py-14 text-center text-white">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-white/10" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-200">
            Discover
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Search destinations</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-indigo-100">
            Find any city in the world — then jump straight into weather, places and planning.
          </p>

          <div className="mx-auto mt-6 flex max-w-lg items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-xl ring-1 ring-white/50 focus-within:ring-2 focus-within:ring-sky-300">
            <Search size={19} className="shrink-0 text-slate-400" />
            <label htmlFor="dest-search" className="sr-only">
              Search destinations
            </label>
            <input
              id="dest-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for a city or place..."
              autoComplete="off"
              className="min-w-0 flex-1 border-0 bg-transparent py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-8">
        {isSearching ? (
          <DestinationSearchResults
            status={status}
            results={results}
            error={error}
            onRetry={retry}
          />
        ) : (
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <TrendingUp size={14} /> Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCHES.map((city) => (
                <button
                  key={city}
                  onClick={() => setQuery(city)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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