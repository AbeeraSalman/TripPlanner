import { useContext, useCallback } from "react";
import { TripsContext } from "../store/TripsContext";

export function useTrips() {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error("useTrips must be used within a TripsProvider");
  }
  const { state, dispatch } = context;

  const addTrip = useCallback((trip) => dispatch({ type: "ADD_TRIP", payload: trip }), [dispatch]);
  const updateTrip = useCallback((trip) => dispatch({ type: "UPDATE_TRIP", payload: trip }), [dispatch]);
  const deleteTrip = useCallback((id) => dispatch({ type: "DELETE_TRIP", payload: id }), [dispatch]);

  const addDay = useCallback((tripId) => dispatch({ type: "ADD_DAY", payload: { tripId } }), [dispatch]);

  const addActivity = useCallback(
    (tripId, dayId, activity) => dispatch({ type: "ADD_ACTIVITY", payload: { tripId, dayId, activity } }),
    [dispatch]
  );

  const editActivity = useCallback(
    (tripId, dayId, activityId, updates) =>
      dispatch({ type: "EDIT_ACTIVITY", payload: { tripId, dayId, activityId, updates } }),
    [dispatch]
  );

  const deleteActivity = useCallback(
    (tripId, dayId, activityId) =>
      dispatch({ type: "DELETE_ACTIVITY", payload: { tripId, dayId, activityId } }),
    [dispatch]
  );

  const toggleActivityComplete = useCallback(
    (tripId, dayId, activityId) =>
      dispatch({ type: "TOGGLE_ACTIVITY_COMPLETE", payload: { tripId, dayId, activityId } }),
    [dispatch]
  );

  const reorderActivity = useCallback(
    (tripId, dayId, activityId, direction) =>
      dispatch({ type: "REORDER_ACTIVITY", payload: { tripId, dayId, activityId, direction } }),
    [dispatch]
  );

  const moveActivity = useCallback(
    (tripId, fromDayId, toDayId, activityId) =>
      dispatch({ type: "MOVE_ACTIVITY", payload: { tripId, fromDayId, toDayId, activityId } }),
    [dispatch]
  );
  const addExpense = useCallback(
    (tripId, expense) => dispatch({ type: "ADD_EXPENSE", payload: { tripId, expense } }),
    [dispatch]
  );
  const editExpense = useCallback(
    (tripId, expenseId, updates) => dispatch({ type: "EDIT_EXPENSE", payload: { tripId, expenseId, updates } }),
    [dispatch]
  );
  const deleteExpense = useCallback(
    (tripId, expenseId) => dispatch({ type: "DELETE_EXPENSE", payload: { tripId, expenseId } }),
    [dispatch]
  );
  return {
    trips: state.trips,
    addTrip,
    updateTrip,
    deleteTrip,
    addDay,
    addActivity,
    editActivity,
    deleteActivity,
    toggleActivityComplete,
    reorderActivity,
    moveActivity,
    addExpense,
    editExpense,
    deleteExpense,
  };
}