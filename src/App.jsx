import { Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/new" element={<TripNew />} />
            <Route path="/trips/:tripId" element={<TripDetail />} />
            <Route path="/trips/:tripId/itinerary" element={<Itinerary />} />
            <Route path="/trips/:tripId/budget" element={<Budget />} />
            <Route path="/saved" element={<div>Saved page</div>} />
            <Route path="/settings" element={<div>Settings page</div>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}