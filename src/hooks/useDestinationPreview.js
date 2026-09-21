import { useState, useEffect, useCallback } from "react";
import { getCurrentWeather } from "../Services/weatherApi";
import { getWikiSummary } from "../Services/wikipediaApi";

export function useDestinationPreview(place) {
  const [data, setData] = useState({ temperature: null, imageUrl: null });
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const load = useCallback(() => {
    if (!place) return;
    setStatus("loading");

    // allSettled so a weather failure doesn't block the image, or vice versa
    Promise.allSettled([
      getCurrentWeather(place.latitude, place.longitude),
      getWikiSummary(place.name, place.admin1),
    ]).then(([weatherResult, wikiResult]) => {
      setData({
        temperature: weatherResult.status === "fulfilled" ? weatherResult.value?.temperature ?? null : null,
        imageUrl: wikiResult.status === "fulfilled" ? wikiResult.value?.imageUrl ?? null : null,
      });
      setStatus("success");
    });
  }, [place]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, status, retry: load };
}