import { createContext, useReducer, useEffect } from "react";

export const SavedContext = createContext(null);
const STORAGE_KEY = "tripplanner_saved";

function savedReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

export function SavedProvider({ children }) {
  const [items, dispatch] = useReducer(savedReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) dispatch({ type: "LOAD", payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return <SavedContext.Provider value={{ items, dispatch }}>{children}</SavedContext.Provider>;
}