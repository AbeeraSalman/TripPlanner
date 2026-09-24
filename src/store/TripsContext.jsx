import { createContext, useReducer, useEffect } from "react";
import { tripsReducer, initialTripsState } from "./TripReducer";
import { loadFromStorage } from "../utils/storage";

export const TripsContext = createContext(null);

const STORAGE_KEY = "tripplanner_trips";

function initTripsState() {
  const savedTrips = loadFromStorage(STORAGE_KEY, []);
  return { ...initialTripsState, trips: Array.isArray(savedTrips) ? savedTrips : [] };
}

export function TripsProvider({ children }) {
  const [state, dispatch] = useReducer(tripsReducer, undefined, initTripsState);

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