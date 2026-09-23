import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, CalendarDays } from "lucide-react";
import { useItinerary } from "../hooks/useItinerary";
import DayTabs from "../Components/Itinerary/DayTabs";
import ActivityCard from "../Components/Itinerary/ActivityCard";
import ActivityForm from "../Components/Itinerary/ActivityForm";
import TripTabs from "../Components/trip/TripTabs";

export default function Itinerary() {
  const { tripId } = useParams();
  const {
    trip,
    days,
    addDay,
    addActivity,
    editActivity,
    deleteActivity,
    toggleActivityComplete,
    reorderActivity,
    moveActivity,
  } = useItinerary(tripId);

  const [activeDayId, setActiveDayId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!activeDayId && days.length > 0) {
      setActiveDayId(days[0].id);
    }
  }, [days, activeDayId]);

  if (!trip) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-slate-600">Trip not found.</p>
        <Link to="/trips" className="text-sm font-medium text-indigo-600 hover:underline">
          ← Back to trips
        </Link>
      </div>
    );
  }

  const activeDay = days.find((d) => d.id === activeDayId);
  const otherDays = days.filter((d) => d.id !== activeDayId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to={`/trips/${tripId}`} className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={16} />
        Back to {trip.name}
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-slate-900">Itinerary</h1>
      <p className="mb-6 text-sm text-slate-500">{trip.destination}</p>


      <TripTabs tripId={tripId} />
      {days.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white py-16 text-center">
          <CalendarDays size={28} className="text-slate-300" />
          <p className="text-sm font-medium text-slate-600">No days added yet.</p>
          <button
            onClick={addDay}
            className="mt-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Add Day 1
          </button>
        </div>
      ) : (
        <>
          <DayTabs days={days} activeDayId={activeDayId} onSelectDay={setActiveDayId} onAddDay={addDay} />

          <div className="mt-4 space-y-2">
            {activeDay?.activities.length === 0 && !isAdding && (
              <p className="py-6 text-center text-sm text-slate-400">No activities yet for this day.</p>
            )}

            {activeDay?.activities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isFirst={index === 0}
                isLast={index === activeDay.activities.length - 1}
                otherDays={otherDays}
                onEdit={(updates) => editActivity(activeDay.id, activity.id, updates)}
                onDelete={() => deleteActivity(activeDay.id, activity.id)}
                onToggleComplete={() => toggleActivityComplete(activeDay.id, activity.id)}
                onReorder={(direction) => reorderActivity(activeDay.id, activity.id, direction)}
                onMove={(toDayId) => moveActivity(activeDay.id, toDayId, activity.id)}
              />
            ))}

            {isAdding ? (
              <ActivityForm
                onCancel={() => setIsAdding(false)}
                onSubmit={(activity) => {
                  addActivity(activeDay.id, activity);
                  setIsAdding(false);
                }}
              />
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
              >
                <Plus size={16} />
                Add Activity
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}