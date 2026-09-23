import { useState } from "react";
import { Clock, CheckCircle2, Circle, ChevronUp, ChevronDown, Pencil, Trash2, ArrowRightLeft } from "lucide-react";
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
    <div className={`flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3 shadow-sm ${activity.completed ? "opacity-60" : ""}`}>
      <button onClick={onToggleComplete} className="mt-0.5 text-indigo-500 hover:text-indigo-600" aria-label="Toggle complete">
        {activity.completed ? <CheckCircle2 size={20} /> : <Circle size={20} className="text-slate-300" />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {activity.time && (
            <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
              <Clock size={12} />
              {activity.time}
            </span>
          )}
          <p className={`text-sm font-semibold text-slate-900 ${activity.completed ? "line-through" : ""}`}>
            {activity.title}
          </p>
        </div>
        {activity.notes && <p className="mt-1 text-xs text-slate-500">{activity.notes}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button onClick={() => onReorder("up")} disabled={isFirst} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
          <ChevronUp size={16} />
        </button>
        <button onClick={() => onReorder("down")} disabled={isLast} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
          <ChevronDown size={16} />
        </button>

        {otherDays.length > 0 && (
          <select
            onChange={(e) => e.target.value && onMove(e.target.value)}
            defaultValue=""
            className="rounded border border-slate-200 bg-white px-1 py-1 text-xs text-slate-500"
            title="Move to another day"
          >
            <option value="" disabled>
              <ArrowRightLeft size={12} />
              Move
            </option>
            {otherDays.map((d) => (
              <option key={d.id} value={d.id}>
                Day {d.dayNumber}
              </option>
            ))}
          </select>
        )}

        <button onClick={() => setIsEditing(true)} className="rounded p-1 text-slate-400 hover:bg-slate-100">
          <Pencil size={14} />
        </button>
        <button onClick={onDelete} className="rounded p-1 text-red-400 hover:bg-red-50">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}