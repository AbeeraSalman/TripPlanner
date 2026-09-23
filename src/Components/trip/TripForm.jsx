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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      ...form,
      travelers: Number(form.travelers),
      budget: Number(form.budget),
    });
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-100 ${
      errors[field] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Trip Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g. Turkey Vacation"
          className={inputClass("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Destination</label>
        <input
          type="text"
          value={form.destination}
          onChange={(e) => handleChange("destination", e.target.value)}
          placeholder="e.g. Istanbul"
          className={inputClass("destination")}
        />
        {errors.destination && <p className="mt-1 text-xs text-red-600">{errors.destination}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Start Date</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className={inputClass("startDate")}
          />
          {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">End Date</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className={inputClass("endDate")}
          />
          {errors.endDate && <p className="mt-1 text-xs text-red-600">{errors.endDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Travelers</label>
          <input
            type="number"
            min="1"
            value={form.travelers}
            onChange={(e) => handleChange("travelers", e.target.value)}
            className={inputClass("travelers")}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Budget ($)</label>
          <input
            type="number"
            min="0"
            value={form.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            placeholder="e.g. 2500"
            className={inputClass("budget")}
          />
          {errors.budget && <p className="mt-1 text-xs text-red-600">{errors.budget}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
      >
        Create Trip
      </button>
    </form>
  );
}