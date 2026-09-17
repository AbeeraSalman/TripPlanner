import { useState, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";
import { searchDestinations } from "../Services/geocodingApi";

export function useDestinationSearch(query) {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 400);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    // Cancel whatever request is still in flight before starting/skipping a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!trimmed) {
      setResults([]);
      setStatus("idle");
      setError(null);
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus("loading");
    setError(null);

    searchDestinations(trimmed, { signal: controller.signal })
      .then((data) => {
        setResults(data);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // expected when a newer search superseded this one
        setError(err.message);
        setStatus("error");
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return { results, status, error };
}