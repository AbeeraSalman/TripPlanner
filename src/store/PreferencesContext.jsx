import { createContext, useReducer, useEffect } from "react";
import { loadFromStorage } from "../utils/storage";

export const PreferencesContext = createContext(null);
const STORAGE_KEY = "tripplanner_preferences";

const defaultPreferences = {
  currency: "USD",
  temperatureUnit: "C",
  theme: "light",
  defaultTravelers: 1,
};

function preferencesReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Saved values win, but new default keys still exist for older saved data
function initPreferences() {
  return { ...defaultPreferences, ...loadFromStorage(STORAGE_KEY, {}) };
}

export function PreferencesProvider({ children }) {
  const [preferences, dispatch] = useReducer(preferencesReducer, undefined, initPreferences);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    document.documentElement.classList.toggle("dark", preferences.theme === "dark");
  }, [preferences]);

  return (
    <PreferencesContext.Provider value={{ preferences, dispatch }}>
      {children}
    </PreferencesContext.Provider>
  );
}