import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { TripsProvider } from "./store/TripsContext";
import { SavedProvider } from "./store/SavedContext";
import { PreferencesProvider } from "./store/PreferencesContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PreferencesProvider>
        <AuthProvider>
          <TripsProvider>
            <SavedProvider>
              <App />
            </SavedProvider>
          </TripsProvider>
        </AuthProvider>
      </PreferencesProvider>
    </BrowserRouter>
  </StrictMode>
);