import { useState } from "react";
import { Compass } from "lucide-react";
import { useDestinationSearch } from "../hooks/useDestinationSearch";
import DestinationSearchBar from "../components/destination/DestinationSearchBar";
import DestinationSearchResults from "../Components/destination/DestinationSearchResults";
import DestinationCard from "../Components/destination/DestinationCard";
import { TRENDING_DESTINATIONS } from "../utils/TrendingDestinations";

export default function Destinations() {
  const [query, setQuery] = useState("");
  const { results, status, error, retry } = useDestinationSearch(query);
  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 px-4 py-14 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Where to next?</h1>
        <p className="mt-2 text-sm text-indigo-100 sm:text-base">
          Search any city and start planning your trip in seconds.
        </p>
        <div className="mt-6 flex justify-center">
          <DestinationSearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {isSearching ? (
        <div className="mx-auto max-w-xl px-4 py-8">
          <DestinationSearchResults
            status={status}
            results={results}
            error={error}
            onRetry={retry}
          />
        </div>
      ) : (
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
      )}
    </div>
  );
}