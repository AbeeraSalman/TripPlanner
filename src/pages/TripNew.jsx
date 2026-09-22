import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TripForm from "../Components/trip/TripForm";
import { useTrips } from "../hooks/useTrips";

export default function TripNew() {
  const { addTrip } = useTrips();
  const navigate = useNavigate();

  const handleCreate = (tripData) => {
    const newTrip = {
      id: crypto.randomUUID(),
      ...tripData,
      days: [],       // will hold itinerary days later
      expenses: [],   // will hold expenses not tied to a specific day
    };
    addTrip(newTrip);
    navigate(`/trips/${newTrip.id}`);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <Link to="/trips" className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={16} />
        Back to trips
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Create a New Trip</h1>
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <TripForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}