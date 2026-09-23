import { Link } from "react-router-dom";
import { Bookmark, Landmark, Utensils, Hotel, MapPin } from "lucide-react";
import { useSaved } from "../hooks/useSaved";

const TYPE_META = {
  destination: { label: "Destinations", icon: MapPin },
  attraction: { label: "Attractions", icon: Landmark },
  restaurant: { label: "Restaurants", icon: Utensils },
  hotel: { label: "Hotels", icon: Hotel },
};

export default function Saved() {
  const { items, toggleSaved } = useSaved();

  const grouped = items.reduce((acc, item) => {
    (acc[item.type] ??= []).push(item);
    return acc;
  }, {});

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-center">
        <Bookmark size={32} className="text-slate-300" />
        <p className="text-sm font-medium text-slate-600">Nothing saved yet.</p>
        <p className="text-xs text-slate-400">Bookmark destinations, attractions, restaurants, or hotels to see them here.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Saved Places</h1>

      {Object.entries(TYPE_META).map(([type, meta]) =>
        grouped[type]?.length ? (
          <div key={type} className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <meta.icon size={16} className="text-indigo-500" />
              {meta.label}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {grouped[type].map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                    {item.subtitle && <p className="truncate text-xs text-slate-500">{item.subtitle}</p>}
                  </div>
                  <button onClick={() => toggleSaved(item)} className="shrink-0 text-xs font-medium text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}