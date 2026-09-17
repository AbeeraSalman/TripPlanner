import { useState } from "react";
import { useDestinationSearch } from "../hooks/useDestinationSearch";
import DestinationSearchBar from "../Components/destination/DestinationSearchBar";
import DestinationSearchResults from "../Components/destination/DestinationSearchResults";
export default function Destinations() {
  const [query, setQuery] = useState("");
  const { results, status, error, retry } = useDestinationSearch(query);

  return (
    <div className="px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-slate-900">
        Find a destination
      </h1>
      <DestinationSearchBar value={query} onChange={setQuery} />
      <DestinationSearchResults
        status={status}
        results={results}
        error={error}
        onRetry={retry}
      />
    </div>
  );
}