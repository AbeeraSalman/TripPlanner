// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";


export default function App() {
  return (<>
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/destinations" element={<div><Destinations /></div>} />
        <Route
          path="/destinations/:destinationId"
          element={<div><DestinationDetails /></div>}
        />
        <Route path="/trips" element={<div>Trips page</div>} />
        <Route path="/trips/new" element={<div>New trip page</div>} />
        <Route path="/trips/:tripId" element={<div>Trip details page</div>} />
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