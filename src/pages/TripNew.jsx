import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import TripForm from "../Components/trip/TripForm";
import { useTrips } from "../hooks/useTrips";

export default function TripNew() {
  const { addTrip } = useTrips();
  const navigate = useNavigate();

  const handleCreate = (tripData) => {
    const newTrip = {
      id: crypto.randomUUID(),
      ...tripData,
      days: [], // will hold itinerary days later
      expenses: [], // will hold expenses not tied to a specific day
    };
    addTrip(newTrip);
    navigate(`/trips/${newTrip.id}`);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <Link
        to="/trips"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft size={15} /> Back to trips
      </Link>

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">New trip</p>
        <h1 className="mt-1.5 flex items-center gap-2 text-3xl font-extrabold text-slate-900 dark:text-white">
          <Sparkles size={26} className="text-indigo-500" /> Create a trip
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Give it a name, destination, dates and a budget — you can refine everything later.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none sm:p-8">
        <TripForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}