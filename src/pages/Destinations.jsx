import { useState } from "react";
import { useDestinationSearch } from "../hooks/useDestinationSearch";
import DestinationSearchBar from "../Components/destination/DestinationSearchBar";
import DestinationSearchResults from "../Components/destination/DestinationSearchResults";

export default function Destinations() {
  const [query, setQuery] = useState("");
  const { results, status, error, retry } = useDestinationSearch(query);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 px-4 py-14 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Where to next?</h1>
        <p className="mt-2 text-sm text-indigo-100 sm:text-base">
          Search any city and start planning your trip in seconds.
        </p>
        <div className="mt-6 flex justify-center">
          <DestinationSearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-xl px-4 py-8">
        <DestinationSearchResults
          status={status}
          results={results}
          error={error}
          onRetry={retry}
        />
      </div>
    </div>
  );
}