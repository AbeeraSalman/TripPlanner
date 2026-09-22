import { useContext, useCallback } from "react";
import { TripsContext } from "../store/TripsContext";

export function useTrips() {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error("useTrips must be used within a TripsProvider");
  }
  const { state, dispatch } = context;

  const addTrip = useCallback(
    (trip) => dispatch({ type: "ADD_TRIP", payload: trip }),
    [dispatch]
  );
  const updateTrip = useCallback(
    (trip) => dispatch({ type: "UPDATE_TRIP", payload: trip }),
    [dispatch]
  );
  const deleteTrip = useCallback(
    (id) => dispatch({ type: "DELETE_TRIP", payload: id }),
    [dispatch]
  );

  return { trips: state.trips, addTrip, updateTrip, deleteTrip };
}