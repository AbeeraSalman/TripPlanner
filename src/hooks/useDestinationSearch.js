import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import { searchDestinations } from "../Services/geocodingApi";

export function useDestinationSearch(query) {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 400);
  const abortControllerRef = useRef(null);
  const requestIdRef = useRef(0); // increments on every new search attempt

  const runSearch = useCallback((searchTerm) => {
    const trimmed = searchTerm.trim();

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const thisRequestId = ++requestIdRef.current;

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
        if (thisRequestId !== requestIdRef.current) return; // a newer request has since started
        setResults(data);
        setStatus("success");
      })
      .catch((err) => {
        if (thisRequestId !== requestIdRef.current) return;
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    runSearch(debouncedQuery);
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [debouncedQuery, runSearch]);

  const retry = useCallback(() => runSearch(debouncedQuery), [debouncedQuery, runSearch]);

  return { results, status, error, retry };
}