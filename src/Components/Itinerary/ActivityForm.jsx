import { useState } from "react";

const emptyForm = { time: "", title: "", notes: "" };
const inputClass =
  "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export default function ActivityForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValues ?? emptyForm);
  const [error, setError] = useState("");

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Activity title is required.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/60"
    >
      <div className="grid grid-cols-3 gap-3">
        <input
          type="time"
          value={form.time}
          onChange={(event) => handleChange("time", event.target.value)}
          aria-label="Activity time"
          className={inputClass}
        />
        <input
          type="text"
          value={form.title}
          onChange={(event) => handleChange("title", event.target.value)}
          placeholder="e.g. Hagia Sophia"
          className={`col-span-2 ${inputClass}`}
        />
      </div>
      <textarea
        value={form.notes}
        onChange={(event) => handleChange("notes", event.target.value)}
        placeholder="Notes (optional)"
        rows={2}
        className={`w-full ${inputClass}`}
      />
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