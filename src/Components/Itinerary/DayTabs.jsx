import { Plus } from "lucide-react";

export default function DayTabs({ days, activeDayId, onSelectDay, onAddDay }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
      {days.map((day) => (
        <button
          key={day.id}
          onClick={() => onSelectDay(day.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeDayId === day.id
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Day {day.dayNumber}
        </button>
      ))}
      <button
        onClick={onAddDay}
        className="flex items-center gap-1 rounded-full border border-dashed border-indigo-300 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
      >
        <Plus size={14} />
        Add Day
      </button>
    </div>
  );
}