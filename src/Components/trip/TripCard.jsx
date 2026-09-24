import { Link } from "react-router-dom";
import { Calendar, Users, Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePreferences } from "../../hooks/usePreferences";

export default function TripCard({ trip }) {
  const { preferences } = usePreferences();

  return (
    <Link
      to={`/trips/${trip.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="relative h-24 overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-4 text-white">
        <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/10" />
        <p className="relative truncate text-xs font-semibold uppercase tracking-wider text-indigo-100">
          {trip.destination}
        </p>
        <h3 className="relative mt-0.5 truncate text-lg font-bold">{trip.name}</h3>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 p-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar size={13} className="text-indigo-500" />
          {trip.startDate} → {trip.endDate}
        </span>
        <span className="flex items-center gap-1">
          <Users size={13} className="text-indigo-500" />
          {trip.travelers} travelers
        </span>
        <span className="flex items-center gap-1">
          <Wallet size={13} className="text-indigo-500" />
          {formatCurrency(trip.budget, preferences.currency)}
        </span>
      </div>
    </Link>
  );
}