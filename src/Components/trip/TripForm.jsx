import { useState } from "react";
import { usePreferences } from "../../hooks/usePreferences";

const initialForm = {
  name: "",
  destination: "",
  startDate: "",
  endDate: "",
  travelers: 1,
  budget: "",
};

export default function TripForm({ onSubmit }) {
  const { preferences } = usePreferences();
  const [form, setForm] = useState({ ...initialForm, travelers: preferences.defaultTravelers });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Trip name is required.";
    if (!form.destination.trim()) newErrors.destination = "Destination is required.";
    if (!form.startDate) newErrors.startDate = "Start date is required.";
    if (!form.endDate) newErrors.endDate = "End date is required.";
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      newErrors.endDate = "End date must be after start date.";
    }
    if (!form.budget || Number(form.budget) <= 0) newErrors.budget = "Enter a valid budget.";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      ...form,
      travelers: Number(form.travelers),
      budget: Number(form.budget),
    });
  };

  const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";
  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition dark:bg-slate-900 dark:text-white ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Trip Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(event) => handleChange("name", event.target.value)}
          placeholder="e.g. Turkey Vacation"
          className={inputClass("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass}>Destination</label>
        <input
          type="text"
          value={form.destination}
          onChange={(event) => handleChange("destination", event.target.value)}
          placeholder="e.g. Istanbul"
          className={inputClass("destination")}
        />
        {errors.destination && (
          <p className="mt-1 text-xs text-red-600">{errors.destination}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Start Date</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(event) => handleChange("startDate", event.target.value)}
            className={inputClass("startDate")}
          />
          {errors.startDate && (
            <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>End Date</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(event) => handleChange("endDate", event.target.value)}
            className={inputClass("endDate")}
          />
          {errors.endDate && <p className="mt-1 text-xs text-red-600">{errors.endDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Travelers</label>
          <input
            type="number"
            min="1"
            value={form.travelers}
            onChange={(event) => handleChange("travelers", event.target.value)}
            className={inputClass("travelers")}
          />
        </div>
        <div>
          <label className={labelClass}>Budget ({preferences.currency})</label>
          <input
            type="number"
            min="0"
            value={form.budget}
            onChange={(event) => handleChange("budget", event.target.value)}
            placeholder="e.g. 2500"
            className={inputClass("budget")}
          />
          {errors.budget && <p className="mt-1 text-xs text-red-600">{errors.budget}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-[0.99]"
      >
        Create Trip
      </button>
    </form>
  );
}