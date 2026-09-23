import { useState } from "react";
import { Settings as SettingsIcon, Moon, Sun, Check } from "lucide-react";
import { usePreferences } from "../hooks/usePreferences";

const CURRENCIES = ["USD", "EUR", "GBP", "PKR"];

export default function Settings() {
  const { preferences, updatePreferences } = usePreferences();
  const [draft, setDraft] = useState(preferences);
  const [justSaved, setJustSaved] = useState(false);

  const handleChange = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    updatePreferences(draft);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
        <SettingsIcon size={22} className="text-indigo-500" />
        Settings
      </h1>

      <div className="space-y-6 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Currency</label>
          <select
            value={draft.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          >
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Temperature Unit</label>
          <div className="flex gap-2">
            {["C", "F"].map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => handleChange("temperatureUnit", unit)}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium ${
                  draft.temperatureUnit === unit ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-200 text-slate-500"
                }`}
              >
                °{unit}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Theme</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleChange("theme", "light")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-sm font-medium ${
                draft.theme === "light" ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-200 text-slate-500"
              }`}
            >
              <Sun size={14} /> Light
            </button>
            <button
              type="button"
              onClick={() => handleChange("theme", "dark")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-sm font-medium ${
                draft.theme === "dark" ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-200 text-slate-500"
              }`}
            >
              <Moon size={14} /> Dark
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Default Travelers</label>
          <input
            type="number"
            min="1"
            value={draft.defaultTravelers}
            onChange={(e) => handleChange("defaultTravelers", Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
          <p className="mt-1 text-xs text-slate-400">Used to pre-fill new trip forms.</p>
        </div>

        <button
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {justSaved ? <><Check size={16} /> Saved!</> : "Save Changes"}
        </button>
      </div>
    </div>
  );
}