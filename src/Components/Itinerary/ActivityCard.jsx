import { useState } from "react";
import {
  ArrowRightLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
  Pencil,
  Trash2,
} from "lucide-react";
import ActivityForm from "./ActivityForm";

export default function ActivityCard({
  activity,
  isFirst,
  isLast,
  otherDays,
  onEdit,
  onDelete,
  onToggleComplete,
  onReorder,
  onMove,
}) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ActivityForm
        initialValues={activity}
        onCancel={() => setIsEditing(false)}
        onSubmit={(updates) => {
          onEdit(updates);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-sm transition dark:border-slate-700 dark:bg-slate-800 ${
        activity.completed ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={onToggleComplete}
        className="mt-0.5 text-indigo-500 transition hover:text-indigo-600"
        aria-label="Toggle complete"
      >
        {activity.completed ? (
          <CheckCircle2 size={20} className="text-emerald-500" />
        ) : (
          <Circle size={20} className="text-slate-300" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {activity.time && (
            <span className="flex items-center gap-1 rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-slate-900 dark:text-indigo-400">
              <Clock size={11} />
              {activity.time}
            </span>
          )}
          <p
            className={`text-sm font-semibold text-slate-900 dark:text-white ${
              activity.completed ? "line-through" : ""
            }`}
          >
            {activity.title}
          </p>
        </div>
        {activity.notes && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{activity.notes}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onReorder("up")}
          disabled={isFirst}
          aria-label="Move up"
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-700"
        >
          <ChevronUp size={16} />
        </button>
        <button
          onClick={() => onReorder("down")}
          disabled={isLast}
          aria-label="Move down"
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-700"
        >
          <ChevronDown size={16} />
        </button>

        {otherDays.length > 0 && (
          <select
            onChange={(event) => event.target.value && onMove(event.target.value)}
            defaultValue=""
            className="rounded-lg border border-slate-200 bg-white px-1 py-1 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900"
            title="Move to another day"
            aria-label="Move activity to another day"
          >
            <option value="" disabled>
              <ArrowRightLeft size={12} />
              Move
            </option>
            {otherDays.map((day) => (
              <option key={day.id} value={day.id}>
                Day {day.dayNumber}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => setIsEditing(true)}
          aria-label="Edit activity"
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          aria-label="Delete activity"
          className="rounded-lg p-1 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}