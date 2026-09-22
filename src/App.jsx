// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import TripNew from "./pages/TripNew";
import TripDetail from "./pages/TripDetail";


export default function App() {
  return (<>
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<div><Home /></div>} />
        <Route path="/destinations" element={<div><Destinations /></div>} />
        <Route
          path="/destinations/:destinationId"
          element={<div><DestinationDetails /></div>}
        />
       <Route path="/trips" element={<Trips />} />
<Route path="/trips/new" element={<TripNew />} />
<Route path="/trips/:tripId" element={<TripDetail />} />
        <Route
          path="/trips/:tripId/itinerary"
          element={<div>Trip itinerary page</div>}
        />
        <Route
          path="/trips/:tripId/budget"
          element={<div>Trip budget page</div>}
        />
        <Route path="/saved" element={<div>Saved page</div>} />
        <Route path="/settings" element={<div>Settings page</div>} />
      </Routes>
    </div>
  </>

  );
}