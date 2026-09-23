import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ExpenseForm from "./ExpenseForm";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePreferences } from "../../hooks/usePreferences";

const CATEGORY_COLORS = {
  Accommodation: "bg-indigo-50 text-indigo-600",
  Food: "bg-amber-50 text-amber-700",
  Transportation: "bg-blue-50 text-blue-600",
  Activities: "bg-emerald-50 text-emerald-600",
  Shopping: "bg-pink-50 text-pink-600",
  Miscellaneous: "bg-slate-100 text-slate-600",
};

export default function ExpenseRow({ expense, minDate, maxDate, onEdit, onDelete }) {
  const { preferences } = usePreferences();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ExpenseForm
        initialValues={expense}
        minDate={minDate}
        maxDate={maxDate}
        onCancel={() => setIsEditing(false)}
        onSubmit={(updates) => {
          onEdit(updates);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-white p-3 shadow-sm">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-slate-900">{expense.description}</p>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${CATEGORY_COLORS[expense.category] || "bg-slate-100 text-slate-600"}`}>
            {expense.category}
          </span>
        </div>
        <p className="text-xs text-slate-400">{expense.date || "No date"}</p>
      </div>

      <p className="shrink-0 text-sm font-bold text-slate-900">
        {formatCurrency(expense.amount, preferences.currency)}
      </p>

      <div className="flex shrink-0 items-center gap-1">
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