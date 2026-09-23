import { useParams, Link } from "react-router-dom";
import { Calendar, Users, Wallet, ArrowLeft } from "lucide-react";
import { useTrips } from "../hooks/useTrips";
import TripTabs from "../Components/trip/TripTabs";

export default function TripDetail() {
  const { tripId } = useParams();
  const { trips } = useTrips();
  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-slate-600">Trip not found.</p>
        <Link to="/trips" className="text-sm font-medium text-indigo-600 hover:underline">← Back to trips</Link>
      </div>
    );
  }

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
    </div>
  );
}