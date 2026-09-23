import { useState } from "react";

const emptyForm = { time: "", title: "", notes: "" };

export default function ActivityForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValues ?? emptyForm);
  const [error, setError] = useState("");

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Activity title is required.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="grid grid-cols-3 gap-3">
        <input
          type="time"
          value={form.time}
          onChange={(e) => handleChange("time", e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Hagia Sophia"
          className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
      </div>
      <textarea
        value={form.notes}
        onChange={(e) => handleChange("notes", e.target.value)}
        placeholder="Notes (optional)"
        rows={2}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}