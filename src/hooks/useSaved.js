import { useContext, useCallback } from "react";
import { SavedContext } from "../store/SavedContext";

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) throw new Error("useSaved must be used within a SavedProvider");
  const { items, dispatch } = context;

  const isSaved = useCallback((id) => items.some((item) => item.id === id), [items]);

  const toggleSaved = useCallback(
    (item) => {
      if (isSaved(item.id)) {
        dispatch({ type: "REMOVE", payload: item.id });
      } else {
        dispatch({ type: "ADD", payload: { ...item, savedAt: new Date().toISOString() } });
      }
    },
    [isSaved, dispatch]
  );

  return { items, isSaved, toggleSaved };
}