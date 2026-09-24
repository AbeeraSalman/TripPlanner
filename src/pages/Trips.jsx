import { Link } from "react-router-dom";
import { Plus, Luggage, MapPinned, Wallet } from "lucide-react";
import { useTrips } from "../hooks/useTrips";
import { usePreferences } from "../hooks/usePreferences";
import { formatCurrency } from "../utils/formatCurrency";
import TripCard from "../Components/trip/TripCard";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-700 dark:text-indigo-300">
        <Icon size={19} />
      </span>
      <div>
        <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}

export default function Trips() {
  const { trips } = useTrips();
  const { preferences } = usePreferences();
  const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.budget || 0), 0);
  const totalTravelers = trips.reduce((sum, trip) => sum + Number(trip.travelers || 0), 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Dashboard</p>
          <h1 className="mt-1.5 text-3xl font-extrabold text-slate-900 dark:text-white">
            Your trips
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {trips.length > 0
              ? `${trips.length} adventure${trips.length > 1 ? "s" : ""} in progress.`
              : "Nothing planned yet — let's fix that."}
          </p>
        </div>
        <Link
          to="/trips/new"
          className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700"
        >
          <Plus size={16} /> New Trip
        </Link>
      </div>

      {trips.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon={Luggage} label="Total Trips" value={trips.length} />
          <StatCard icon={MapPinned} label="Travelers" value={totalTravelers} />
          <StatCard
            icon={Wallet}
            label="Total Budget"
            value={formatCurrency(totalBudget, preferences.currency)}
          />
        </div>
      )}

      {trips.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-indigo-200 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-800">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/30">
            <Luggage size={30} />
          </span>
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">No trips yet</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Create your first trip to start building the itinerary and budget.
            </p>
          </div>
          <Link
            to="/trips/new"
            className="mt-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-700"
          >
            Create a Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}