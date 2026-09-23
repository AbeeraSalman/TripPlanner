import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { TripsProvider } from "./store/TripsContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TripsProvider>
          <App />
        </TripsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);