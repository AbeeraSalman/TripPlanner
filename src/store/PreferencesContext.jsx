import { createContext, useReducer, useEffect } from "react";

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
    case "LOAD":
      return { ...state, ...action.payload };
    case "UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function PreferencesProvider({ children }) {
  const [preferences, dispatch] = useReducer(preferencesReducer, defaultPreferences);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) dispatch({ type: "LOAD", payload: JSON.parse(saved) });
  }, []);

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