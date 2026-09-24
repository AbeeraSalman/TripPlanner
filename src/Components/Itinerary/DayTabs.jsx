import { Plus } from "lucide-react";

export default function DayTabs({ days, activeDayId, onSelectDay, onAddDay }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-700">
      {days.map((day) => {
        const active = activeDayId === day.id;
        return (
          <button
            key={day.id}
            onClick={() => onSelectDay(day.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              active
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            Day {day.dayNumber}
          </button>
        );
      })}
      <button
        onClick={onAddDay}
        className="flex items-center gap-1 rounded-full border border-dashed border-indigo-300 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-slate-800"
      >
        <Plus size={14} />
        Add Day
      </button>
    </div>
  );
}