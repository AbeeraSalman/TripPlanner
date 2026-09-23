import { useContext, useCallback } from "react";
import { PreferencesContext } from "../store/PreferencesContext";

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used within a PreferencesProvider");
  const { preferences, dispatch } = context;

  const updatePreferences = useCallback(
    (updates) => dispatch({ type: "UPDATE", payload: updates }),
    [dispatch]
  );

  return { preferences, updatePreferences };
}