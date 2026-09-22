export const initialTripsState = {
  trips: [],
};

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
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };

    default:
      return state;
  }
}