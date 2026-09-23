import { Link } from "react-router-dom";
import { Calendar, Users, Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePreferences } from "../../hooks/usePreferences";

export default function TripCard({ trip }) {
  const { preferences } = usePreferences();

  return (
    <Link
      to={`/trips/${trip.id}`}
      className="block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-20 bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-indigo-100">
          {trip.destination}
        </p>
        <h3 className="text-lg font-bold text-white">{trip.name}</h3>
      </div>

      <div className="flex flex-wrap gap-4 p-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Calendar size={14} className="text-indigo-500" />
          {trip.startDate} → {trip.endDate}
        </span>
        <span className="flex items-center gap-1">
          <Users size={14} className="text-indigo-500" />
          {trip.travelers} travelers
        </span>
        <span className="flex items-center gap-1">
          <Wallet size={14} className="text-indigo-500" />
          {formatCurrency(trip.budget, preferences.currency)}
        </span>
      </div>
    </Link>
  );
}