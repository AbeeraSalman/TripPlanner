import { useEffect, useState, useCallback } from "react";
import { getNearbyPlaces } from "../Services/placesApi";

export function usePlaces(latitude, longitude, category) {
  const [places, setPlaces] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | empty

  const load = useCallback(() => {
    if (latitude == null || longitude == null) return;
    setStatus("loading");
    getNearbyPlaces(latitude, longitude, category)
      .then((data) => {
        setPlaces(data);
        setStatus(data.length === 0 ? "empty" : "success");
      })
      .catch(() => setStatus("error"));
  }, [latitude, longitude, category]);

  useEffect(() => {
    load();
  }, [load]);

  return { places, status, retry: load };
}