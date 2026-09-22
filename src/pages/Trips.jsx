import { Link } from "react-router-dom";
import { Plus, Luggage, MapPinned, Wallet } from "lucide-react";
import { useTrips } from "../hooks/useTrips";
import TripCard from "../Components/trip/TripCard";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-lg font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default function Trips() {
  const { trips } = useTrips();
  const totalBudget = trips.reduce((sum, t) => sum + Number(t.budget || 0), 0);
  const totalTravelers = trips.reduce((sum, t) => sum + Number(t.travelers || 0), 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Your Trips</h1>
        <Link
          to="/trips/new"
          className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          <Plus size={16} />
          New Trip
        </Link>
      </div>

      {trips.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon={Luggage} label="Total Trips" value={trips.length} />
          <StatCard icon={MapPinned} label="Total Travelers" value={totalTravelers} />
          <StatCard icon={Wallet} label="Total Budget" value={`$${totalBudget}`} />
        </div>
      )}

      {trips.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white py-20 text-center">
          <Luggage size={32} className="text-slate-300" />
          <p className="text-sm font-medium text-slate-600">No trips yet.</p>
          <p className="text-xs text-slate-400">Create your first trip to get started.</p>
          <Link
            to="/trips/new"
            className="mt-3 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Create a Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}