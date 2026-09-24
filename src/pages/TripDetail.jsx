import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Users, Wallet } from "lucide-react";
import { useTrips } from "../hooks/useTrips";
import { usePreferences } from "../hooks/usePreferences";
import { formatCurrency } from "../utils/formatCurrency";
import TripTabs from "../Components/trip/TripTabs";
import TripOverview from "../Components/trip/TripOverview";

export default function TripDetail() {
  const { tripId } = useParams();
  const { trips } = useTrips();
  const { preferences } = usePreferences();
  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Trip not found.</p>
        <Link
          to="/trips"
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to trips
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        to="/trips"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft size={15} /> Back to trips
      </Link>

      {/* Trip header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 px-6 py-7 text-white">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
            {trip.destination}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold">{trip.name}</h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-indigo-100">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} /> {trip.startDate} → {trip.endDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={15} /> {trip.travelers} travelers
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet size={15} /> {formatCurrency(trip.budget, preferences.currency)} budget
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <TripTabs tripId={trip.id} />
      </div>

      <div className="mt-6">
        <TripOverview trip={trip} currency={preferences.currency} />
      </div>
    </div>
  );
}