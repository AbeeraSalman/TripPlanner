import { useState } from "react";
import { EXPENSE_CATEGORIES } from "../../utils/expenseCategories";

const emptyForm = { description: "", amount: "", category: EXPENSE_CATEGORIES[0], date: "", notes: "" };

export default function ExpenseForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValues ?? emptyForm);
  const [error, setError] = useState("");

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) return setError("Description is required.");
    if (!form.amount || Number(form.amount) <= 0) return setError("Enter a valid amount.");
    setError("");
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Description"
          className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Amount"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        >
          {EXPENSE_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
        <input
          type="text"
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Notes (optional)"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100">
          Cancel
        </button>
        <button type="submit" className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">
          Save
        </button>
      </div>
    </form>
  );
}