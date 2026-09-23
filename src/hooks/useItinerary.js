import { useTrips } from "./useTrips";

export function useItinerary(tripId) {
  const {
    trips,
    addDay,
    addActivity,
    editActivity,
    deleteActivity,
    toggleActivityComplete,
    reorderActivity,
    moveActivity,
  } = useTrips();

  const trip = trips.find((t) => t.id === tripId);

  return {
    trip,
    days: trip?.days ?? [],
    addDay: () => addDay(tripId),
    addActivity: (dayId, activity) => addActivity(tripId, dayId, activity),
    editActivity: (dayId, activityId, updates) => editActivity(tripId, dayId, activityId, updates),
    deleteActivity: (dayId, activityId) => deleteActivity(tripId, dayId, activityId),
    toggleActivityComplete: (dayId, activityId) => toggleActivityComplete(tripId, dayId, activityId),
    reorderActivity: (dayId, activityId, direction) => reorderActivity(tripId, dayId, activityId, direction),
    moveActivity: (fromDayId, toDayId, activityId) => moveActivity(tripId, fromDayId, toDayId, activityId),
  };
}