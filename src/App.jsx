import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/layout/footer";
import ErrorBoundary from "./Components/common/ErrorBoundry";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import TripNew from "./pages/TripNew";
import TripDetail from "./pages/TripDetail";
import Itinerary from "./pages/Itinerary";
import Budget from "./pages/Budget";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Saved from "./pages/saved";
import Settings from "./pages/Settings";
import { useAuth } from "./hooks/useAuth";

// Account required beyond browsing: trips, itinerary, budget, saved places, settings.
// Guests are sent to Sign In and brought back to the page they wanted.
function ProtectedRoute({ children }) {
  const { user, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) return null;
  return user ? children : <Navigate to="/signin" state={{ from: location }} replace />;
}

export default function App() {
  const { isReady } = useAuth();

  if (!isReady) return null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-1">
        <ErrorBoundary>
          <Routes>
            {/* Landing page — the first thing you see when the server starts */}
            <Route path="/" element={<Home />} />

            {/* Public browsing */}
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Account required */}
            <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
            <Route path="/trips/new" element={<ProtectedRoute><TripNew /></ProtectedRoute>} />
            <Route path="/trips/:tripId" element={<ProtectedRoute><TripDetail /></ProtectedRoute>} />
            <Route path="/trips/:tripId/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
            <Route path="/trips/:tripId/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

            {/* Anything else → back to the landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}