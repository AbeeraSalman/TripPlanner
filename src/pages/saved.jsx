import { Link } from "react-router-dom";
import { Bookmark, Landmark, Utensils, Hotel, MapPin, Search } from "lucide-react";
import { useSaved } from "../hooks/useSaved";
import SavedDestinationCard from "../Components/destination/SavedDestinationCard";

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
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-indigo-200 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-800">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/30">
            <Bookmark size={30} />
          </span>
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Nothing saved yet</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Bookmark destinations, attractions, restaurants or hotels and they&apos;ll show up
              here.
            </p>
          </div>
          <Link
            to="/destinations"
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-700"
          >
            <Search size={15} /> Find places to save
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Your library</p>
        <h1 className="mt-1.5 text-3xl font-extrabold text-slate-900 dark:text-white">
          Saved places
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {items.length} place{items.length > 1 ? "s" : ""} bookmarked across your travels.
        </p>
      </div>

      {Object.entries(TYPE_META).map(([type, meta]) =>
        grouped[type]?.length ? (
          <section key={type} className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <meta.icon size={16} className="text-indigo-500" />
              {meta.label}
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
                {grouped[type].length}
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {grouped[type].map((item) =>
                type === "destination" ? (
                  <SavedDestinationCard
                    key={item.id}
                    item={item}
                    onRemove={() => toggleSaved(item)}
                  />
                ) : (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </p>
                      {item.subtitle && (
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSaved(item)}
                      className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-red-500 transition hover:border-red-200 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-950/40"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}