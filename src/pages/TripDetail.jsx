import { useParams, Link } from "react-router-dom";
import { Calendar, Users, Wallet, ArrowLeft } from "lucide-react";
import { useTrips } from "../hooks/useTrips";
import { usePreferences } from "../hooks/usePreferences";
import { formatCurrency } from "../utils/formatCurrency";
import TripTabs from "../Components/trip/TripTabs";

export default function TripDetail() {
  const { tripId } = useParams();
  const { trips } = useTrips();
  const { preferences } = usePreferences();
  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-slate-600">Trip not found.</p>
        <Link to="/trips" className="text-sm font-medium text-indigo-600 hover:underline">← Back to trips</Link>
      </div>
    );
  }

  const totalActivities = trip.days.reduce((sum, day) => sum + day.activities.length, 0);
  const completedActivities = trip.days.reduce(
    (sum, day) => sum + day.activities.filter((activity) => activity.completed).length,
    0
  );
  const totalSpent = trip.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const remaining = Number(trip.budget) - totalSpent;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/trips" className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={16} />
        Back to trips
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-slate-900">{trip.name}</h1>
      <p className="mb-4 text-sm text-slate-500">{trip.destination}</p>

      <TripTabs tripId={trip.id} />

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-5 text-sm text-slate-600">
          <span className="flex items-center gap-1.5"><Calendar size={16} className="text-indigo-500" />{trip.startDate} → {trip.endDate}</span>
          <span className="flex items-center gap-1.5"><Users size={16} className="text-indigo-500" />{trip.travelers} travelers</span>
          <span className="flex items-center gap-1.5"><Wallet size={16} className="text-indigo-500" />${trip.budget} budget</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xl font-bold text-slate-900">{trip.days.length}</p>
          <p className="text-xs text-slate-500">Days Planned</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xl font-bold text-slate-900">{completedActivities}/{totalActivities}</p>
          <p className="text-xs text-slate-500">Activities Done</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
          <p className="text-xl font-bold text-slate-900">{formatCurrency(totalSpent, preferences.currency)}</p>
          <p className="text-xs text-slate-500">Spent</p>
        </div>
        <div className={`rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm ${remaining < 0 ? "text-red-600" : ""}`}>
          <p className="text-xl font-bold text-slate-900">{formatCurrency(remaining, preferences.currency)}</p>
          <p className="text-xs text-slate-500">Remaining</p>
        </div>
      </div>
    </div>
  );
}