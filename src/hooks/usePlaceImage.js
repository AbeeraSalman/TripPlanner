import { useState, useEffect, useCallback } from "react";
import { getPlaceImage } from "../Services/placeImagesApi";

// Photo state for a single place row: loading → success | empty | error.
// The effect only calls setState inside async callbacks (React rendering rules).
export function usePlaceImage(place) {
  const [state, setState] = useState({ status: "loading", imageUrl: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getPlaceImage(place, { signal: controller.signal })
      .then((imageUrl) => {
        setState({ status: imageUrl ? "success" : "empty", imageUrl });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({ status: "error", imageUrl: null });
      });

    return () => controller.abort();
  }, [place, attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading", imageUrl: null });
    setAttempt((value) => value + 1);
  }, []);

  return { imageUrl: state.imageUrl, status: state.status, retry };
}