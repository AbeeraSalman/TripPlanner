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
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            {expense.description}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
              CATEGORY_COLORS[expense.category] || "bg-slate-100 text-slate-600"
            }`}
          >
            {expense.category}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-400">{expense.date || "No date"}</p>
      </div>

      <p className="shrink-0 text-sm font-extrabold text-slate-900 dark:text-white">
        {formatCurrency(expense.amount, preferences.currency)}
      </p>

      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => setIsEditing(true)}
          aria-label="Edit expense"
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          aria-label="Delete expense"
          className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}