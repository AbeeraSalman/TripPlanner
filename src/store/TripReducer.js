export const initialTripsState = {
  trips: [],
};

function updateTrip(state, tripId, updater) {
  return {
    ...state,
    trips: state.trips.map((trip) => (trip.id === tripId ? updater(trip) : trip)),
  };
}

function updateDay(trip, dayId, updater) {
  return {
    ...trip,
    days: trip.days.map((day) => (day.id === dayId ? updater(day) : day)),
  };
}

export function tripsReducer(state, action) {
  switch (action.type) {
    case "LOAD_TRIPS":
      return { ...state, trips: action.payload };

    case "ADD_TRIP":
      return { ...state, trips: [...state.trips, action.payload] };

    case "UPDATE_TRIP":
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.id ? { ...trip, ...action.payload } : trip
        ),
      };

    case "DELETE_TRIP":
      return { ...state, trips: state.trips.filter((trip) => trip.id !== action.payload) };

    case "ADD_DAY": {
      const { tripId } = action.payload;
      return updateTrip(state, tripId, (trip) => ({
        ...trip,
        days: [
          ...trip.days,
          { id: crypto.randomUUID(), dayNumber: trip.days.length + 1, activities: [] },
        ],
      }));
    }

    case "ADD_ACTIVITY": {
      const { tripId, dayId, activity } = action.payload;
      return updateTrip(state, tripId, (trip) =>
        updateDay(trip, dayId, (day) => ({
          ...day,
          activities: [
            ...day.activities,
            { id: crypto.randomUUID(), completed: false, notes: "", ...activity },
          ],
        }))
      );
    }

    case "EDIT_ACTIVITY": {
      const { tripId, dayId, activityId, updates } = action.payload;
      return updateTrip(state, tripId, (trip) =>
        updateDay(trip, dayId, (day) => ({
          ...day,
          activities: day.activities.map((a) => (a.id === activityId ? { ...a, ...updates } : a)),
        }))
      );
    }

    case "DELETE_ACTIVITY": {
      const { tripId, dayId, activityId } = action.payload;
      return updateTrip(state, tripId, (trip) =>
        updateDay(trip, dayId, (day) => ({
          ...day,
          activities: day.activities.filter((a) => a.id !== activityId),
        }))
      );
    }

    case "TOGGLE_ACTIVITY_COMPLETE": {
      const { tripId, dayId, activityId } = action.payload;
      return updateTrip(state, tripId, (trip) =>
        updateDay(trip, dayId, (day) => ({
          ...day,
          activities: day.activities.map((a) =>
            a.id === activityId ? { ...a, completed: !a.completed } : a
          ),
        }))
      );
    }

    case "REORDER_ACTIVITY": {
      const { tripId, dayId, activityId, direction } = action.payload;
      return updateTrip(state, tripId, (trip) =>
        updateDay(trip, dayId, (day) => {
          const index = day.activities.findIndex((a) => a.id === activityId);
          const swapWith = direction === "up" ? index - 1 : index + 1;
          if (index === -1 || swapWith < 0 || swapWith >= day.activities.length) return day;

          const activities = [...day.activities];
          [activities[index], activities[swapWith]] = [activities[swapWith], activities[index]];
          return { ...day, activities };
        })
      );
    }

    case "MOVE_ACTIVITY": {
      const { tripId, fromDayId, toDayId, activityId } = action.payload;
      return updateTrip(state, tripId, (trip) => {
        const fromDay = trip.days.find((d) => d.id === fromDayId);
        const activity = fromDay?.activities.find((a) => a.id === activityId);
        if (!activity) return trip;

        return {
          ...trip,
          days: trip.days.map((d) => {
            if (d.id === fromDayId) {
              return { ...d, activities: d.activities.filter((a) => a.id !== activityId) };
            }
            if (d.id === toDayId) {
              return { ...d, activities: [...d.activities, activity] };
            }
            return d;
          }),
        };
      });
    } case "ADD_EXPENSE": {
      const { tripId, expense } = action.payload;
      return updateTrip(state, tripId, (trip) => ({
        ...trip,
        expenses: [...trip.expenses, { id: crypto.randomUUID(), ...expense }],
      }));
    }

    case "EDIT_EXPENSE": {
      const { tripId, expenseId, updates } = action.payload;
      return updateTrip(state, tripId, (trip) => ({
        ...trip,
        expenses: trip.expenses.map((e) => (e.id === expenseId ? { ...e, ...updates } : e)),
      }));
    }

    case "DELETE_EXPENSE": {
      const { tripId, expenseId } = action.payload;
      return updateTrip(state, tripId, (trip) => ({
        ...trip,
        expenses: trip.expenses.filter((e) => e.id !== expenseId),
      }));
    }

    default:
      return state;
  }
}