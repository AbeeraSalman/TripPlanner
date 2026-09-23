import { Navigate, Route, Routes } from "react-router-dom";
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

function ProtectedRoute({ children }) {
  const { user, isReady } = useAuth();

  if (!isReady) return null;
  return user ? children : <Navigate to="/destinations" replace />;
}

export default function App() {
  const { user, isReady } = useAuth();

  if (!isReady) return null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/destinations" replace />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
            <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
            <Route path="/trips/new" element={<ProtectedRoute><TripNew /></ProtectedRoute>} />
            <Route path="/trips/:tripId" element={<ProtectedRoute><TripDetail /></ProtectedRoute>} />
            <Route path="/trips/:tripId/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
            <Route path="/trips/:tripId/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}