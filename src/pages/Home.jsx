import { useState } from "react";
import { Compass } from "lucide-react";
import DestinationSearchBar from "../Components/destination/DestinationSearchBar";
import DestinationSearchResults from "../Components/destination/DestinationSearchResults";
import DestinationCard from "../Components/destination/DestinationCard";
import { useDestinationSearch } from "../hooks/useDestinationSearch";
import { TRENDING_DESTINATIONS } from "../utils/TrendingDestinations";

export default function Home() {
  const [query, setQuery] = useState("");
  const { results, status, error, retry } = useDestinationSearch(query);
  const showSuggestions = query.trim().length > 0;

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 px-4 py-20 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-5xl">Plan your next adventure</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-indigo-100 sm:text-base">
          Discover destinations, check the weather, and build the perfect itinerary — all in one place.
        </p>

        <div className="relative mx-auto mt-8 flex max-w-xl justify-center">
          <DestinationSearchBar value={query} onChange={setQuery} />

          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-xl bg-white p-2 text-left shadow-lg">
              <DestinationSearchResults
                status={status}
                results={results}
                error={error}
                onRetry={retry}
              />
            </div>
          )}
        </div>
      </div>

      {/* Trending destinations */}
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Compass size={20} className="text-indigo-500" />
          Popular Destinations
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {TRENDING_DESTINATIONS.map((place) => (
            <DestinationCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}