import { useState } from "react";
import { Check, Moon, Settings as SettingsIcon, Sun, User } from "lucide-react";
import { usePreferences } from "../hooks/usePreferences";
import { useAuth } from "../hooks/useAuth";

const CURRENCIES = ["USD", "EUR", "GBP", "PKR"];

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

const choiceClass = (active) =>
  `flex-1 rounded-xl border py-2.5 text-sm font-semibold transition ${
    active
      ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-slate-900 dark:text-indigo-300"
      : "border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
  }`;

export default function Settings() {
  const { preferences, updatePreferences } = usePreferences();
  const { user } = useAuth();
  const [draft, setDraft] = useState(preferences);
  const [justSaved, setJustSaved] = useState(false);

  const handleChange = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    updatePreferences(draft);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Preferences</p>
        <h1 className="mt-1.5 flex items-center gap-2 text-3xl font-extrabold text-slate-900 dark:text-white">
          <SettingsIcon size={26} className="text-indigo-500" /> Settings
        </h1>
      </div>

      {user && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-slate-700 dark:text-indigo-300">
            <User size={18} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
        </div>
      )}

      <div className="space-y-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none sm:p-8">
        <Field label="Currency">
          <select
            value={draft.currency}
            onChange={(event) => handleChange("currency", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900"
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Temperature unit">
          <div className="flex gap-2">
            {["C", "F"].map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => handleChange("temperatureUnit", unit)}
                className={choiceClass(draft.temperatureUnit === unit)}
              >
                °{unit}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Theme">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleChange("theme", "light")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition ${
                draft.theme === "light"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-slate-900 dark:text-indigo-300"
                  : "border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"
              }`}
            >
              <Sun size={15} /> Light
            </button>
            <button
              type="button"
              onClick={() => handleChange("theme", "dark")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition ${
                draft.theme === "dark"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-slate-900 dark:text-indigo-300"
                  : "border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"
              }`}
            >
              <Moon size={15} /> Dark
            </button>
          </div>
        </Field>

        <Field label="Default travelers" hint="Used to pre-fill new trip forms.">
          <input
            type="number"
            min="1"
            value={draft.defaultTravelers}
            onChange={(event) => handleChange("defaultTravelers", Number(event.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900"
          />
        </Field>

        <button
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700"
        >
          {justSaved ? (
            <>
              <Check size={16} /> Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}