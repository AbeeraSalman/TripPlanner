import { createContext, useReducer, useEffect } from "react";
import { loadFromStorage } from "../utils/storage";

export const SavedContext = createContext(null);
const STORAGE_KEY = "tripplanner_saved";

function savedReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

function initSavedState() {
  const savedItems = loadFromStorage(STORAGE_KEY, []);
  return Array.isArray(savedItems) ? savedItems : [];
}

export function SavedProvider({ children }) {
  const [items, dispatch] = useReducer(savedReducer, undefined, initSavedState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return <SavedContext.Provider value={{ items, dispatch }}>{children}</SavedContext.Provider>;
}