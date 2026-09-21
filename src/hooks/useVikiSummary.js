import { useState, useEffect, useCallback } from "react";
import { getWikiSummary } from "../Services/wikipediaApi";

export function useWikiSummary(placeName, region) {
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | empty

  const load = useCallback(() => {
    if (!placeName) return;
    setStatus("loading");
    getWikiSummary(placeName, region)
      .then((data) => {
        if (data === null) {
          setStatus("empty");
          return;
        }
        setSummary(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [placeName, region]);

  useEffect(() => {
    load();
  }, [load]);

  return { summary, status, retry: load };
}