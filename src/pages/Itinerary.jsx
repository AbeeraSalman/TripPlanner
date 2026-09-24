import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Plus } from "lucide-react";
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

  const [selectedDayId, setSelectedDayId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

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

  // Falls back to the first day when nothing is selected — no effect needed
  const activeDay = days.find((d) => d.id === selectedDayId) ?? days[0];
  const otherDays = days.filter((d) => d.id !== activeDay?.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        to={`/trips/${tripId}`}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft size={15} /> Back to {trip.name}
      </Link>

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Day by day</p>
        <h1 className="mt-1.5 text-3xl font-extrabold text-slate-900 dark:text-white">
          Itinerary
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{trip.destination}</p>
      </div>

      <TripTabs tripId={tripId} />

      {days.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-indigo-200 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-800">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/30">
            <CalendarDays size={26} />
          </span>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">No days added yet</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Start with Day 1, then add activities hour by hour.
            </p>
          </div>
          <button
            onClick={addDay}
            className="mt-1 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-700"
          >
            Add Day 1
          </button>
        </div>
      ) : (
        <>
          <DayTabs
            days={days}
            activeDayId={activeDay?.id}
            onSelectDay={setSelectedDayId}
            onAddDay={addDay}
          />

          <div className="mt-4 space-y-2">
            {activeDay?.activities.length === 0 && !isAdding && (
              <p className="rounded-2xl border border-dashed border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-slate-700">
                No activities yet for this day.
              </p>
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
                className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-600 dark:hover:text-indigo-400"
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