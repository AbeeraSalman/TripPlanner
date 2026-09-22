import { createContext, useReducer, useEffect } from "react";
import { tripsReducer, initialTripsState } from "./TripReducer";

export const TripsContext = createContext(null);

const STORAGE_KEY = "tripplanner_trips";

export function TripsProvider({ children }) {
  const [state, dispatch] = useReducer(tripsReducer, initialTripsState);

  // Load once on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      dispatch({ type: "LOAD_TRIPS", payload: JSON.parse(saved) });
    }
  }, []);

  // Persist whenever trips change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.trips));
  }, [state.trips]);

  return (
    <TripsContext.Provider value={{ state, dispatch }}>
      {children}
    </TripsContext.Provider>
  );
}