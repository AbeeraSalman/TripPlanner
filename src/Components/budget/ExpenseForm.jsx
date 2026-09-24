import { useState } from "react";
import { EXPENSE_CATEGORIES } from "../../utils/expenseCategories";

const emptyForm = {
  description: "",
  amount: "",
  category: EXPENSE_CATEGORIES[0],
  date: "",
  notes: "",
};
const inputClass =
  "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export default function ExpenseForm({ initialValues, minDate, maxDate, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValues ?? emptyForm);
  const [error, setError] = useState("");

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.description.trim()) return setError("Description is required.");
    if (!form.amount || Number(form.amount) <= 0) return setError("Enter a valid amount.");
    if (form.date && minDate && form.date < minDate)
      return setError(`Date can't be before the trip starts (${minDate}).`);
    if (form.date && maxDate && form.date > maxDate)
      return setError(`Date can't be after the trip ends (${maxDate}).`);
    setError("");
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/60"
    >
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={form.description}
          onChange={(event) => handleChange("description", event.target.value)}
          placeholder="Description"
          className={`col-span-2 ${inputClass}`}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={(event) => handleChange("amount", event.target.value)}
          placeholder="Amount"
          className={inputClass}
        />
        <select
          value={form.category}
          onChange={(event) => handleChange("category", event.target.value)}
          aria-label="Expense category"
          className={inputClass}
        >
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={form.date}
          onChange={(event) => handleChange("date", event.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          value={form.notes}
          onChange={(event) => handleChange("notes", event.target.value)}
          placeholder="Notes (optional)"
          className={inputClass}
        />
      </div>

      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-500 hover:bg-white dark:hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-indigo-600 px-5 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}