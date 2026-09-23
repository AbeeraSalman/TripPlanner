import { useState } from "react";
import { Compass, AlertCircle } from "lucide-react";
import DestinationSearchBar from "../Components/destination/DestinationSearchBar";
import DestinationSearchResults from "../Components/destination/DestinationSearchResults";
import DestinationCard from "../Components/destination/DestinationCard";
import { useDestinationSearch } from "../hooks/useDestinationSearch";
import { useCountries } from "../hooks/useCountries";

const PAGE_SIZE = 8;

export default function Home() {
  const [query, setQuery] = useState("");
  const { results, status: searchStatus, error, retry } = useDestinationSearch(query);
  const showSuggestions = query.trim().length > 0;

  const { countries, status: countriesStatus } = useCountries();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleCountries = countries.slice(0, visibleCount);
  const hasMore = visibleCount < countries.length;

  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 px-4 py-20 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-5xl">Plan your next adventure</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-indigo-100 sm:text-base">
          Discover destinations, check the weather, and build the perfect itinerary — all in one place.
        </p>
        <div className="relative mx-auto mt-8 flex max-w-xl justify-center">
          <DestinationSearchBar value={query} onChange={setQuery} />
          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-xl bg-white p-2 text-left shadow-lg">
              <DestinationSearchResults status={searchStatus} results={results} error={error} onRetry={retry} />
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Compass size={20} className="text-indigo-500" />
          Explore Destinations
        </h2>

        {countriesStatus === "loading" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-200" />
            ))}
          </div>
        )}

        {countriesStatus === "error" && (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-red-100 bg-red-50 py-10 text-center">
            <AlertCircle size={24} className="text-red-500" />
            <p className="text-sm font-medium text-red-700">Unable to load destinations.</p>
          </div>
        )}

        {countriesStatus === "success" && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {visibleCountries.map((place) => (
                <DestinationCard key={place.id} place={place} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="rounded-full border border-indigo-200 px-5 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}