import { Link } from "react-router-dom";
import { ArrowRight, Compass, Hotel, Landmark, MapPin, Utensils } from "lucide-react";
import WeatherCard from "../destination/WeatherCard";
import WikiSummaryCard from "../destination/WikiSummaryCard";
import PlacesSection from "../destination/placesSections";
import SaveButton from "../common/saveButton";
import { CATEGORIES } from "./categories";

const PLACES = {
  attractions: { title: "Attractions", icon: Landmark, category: "tourism.sights" },
  restaurants: { title: "Restaurants", icon: Utensils, category: "catering.restaurant" },
  hotels: { title: "Hotels", icon: Hotel, category: "accommodation.hotel" },
};

function FactTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
        {value}
      </p>
    </div>
  );
}

export default function ExplorePanel({ destination, category, onCategoryChange }) {
  if (!destination) {
    return (
      <div className="rounded-3xl border border-dashed border-indigo-200 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-800">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/30">
          <Compass size={30} />
        </span>
        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          Your destination explorer awaits
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          Pick a trending city above or search for any place to preview its{" "}
          <strong>weather, attractions, restaurants and hotels</strong> right here.
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500">
          <ArrowRight size={14} className="-rotate-90" />
          Start with a card from Popular destinations
        </p>
      </div>
    );
  }

  const { id, name, admin1, country, latitude, longitude } = destination;
  const activePlace = PLACES[category];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
      {/* Gradient header: city + region + country */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-5 sm:px-7">
        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <MapPin size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-100">
                Now exploring
              </p>
              <h2 className="truncate text-2xl font-bold text-white">{name}</h2>
              <p className="truncate text-sm text-indigo-100">
                {[admin1, country].filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SaveButton
              item={{
                id: `destination-${id}`,
                type: "destination",
                name,
                subtitle: country,
                admin1,
                latitude,
                longitude,
              }}
            />
            <Link
              to={`/destinations/${id}`}
              state={destination}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow transition hover:bg-indigo-50"
            >
              Full details <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Segmented control */}
      <div className="border-b border-slate-100 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
        <div
          role="tablist"
          aria-label="Destination sections"
          className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1 dark:bg-slate-900/60"
        >
          {CATEGORIES.map(({ id: categoryId, pillLabel, icon: Icon }) => {
            const active = category === categoryId;
            return (
              <button
                key={categoryId}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onCategoryChange(categoryId)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <Icon size={15} />
                {pillLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content by category */}
      <div className="p-4 sm:p-6">
        {category === "all" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <WeatherCard latitude={latitude} longitude={longitude} />
            <div className="sm:col-span-2 lg:col-span-2">
              <WikiSummaryCard placeName={name} region={admin1} />
            </div>
            {Object.entries(PLACES).map(([key, config]) => (
              <PlacesSection
                key={key}
                title={config.title}
                icon={config.icon}
                latitude={latitude}
                longitude={longitude}
                category={config.category}
                limit={2}
              />
            ))}
          </div>
        )}

        {category === "destinations" && (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <WeatherCard latitude={latitude} longitude={longitude} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <FactTile label="City" value={name} />
                <FactTile label="Region" value={admin1 ?? "—"} />
                <FactTile label="Country" value={country ?? "—"} />
              </div>
            </div>
            <div className="lg:col-span-2">
              <WikiSummaryCard placeName={name} region={admin1} />
            </div>
          </div>
        )}

        {activePlace && (
          <PlacesSection
            title={activePlace.title}
            icon={activePlace.icon}
            latitude={latitude}
            longitude={longitude}
            category={activePlace.category}
          />
        )}
      </div>
    </div>
  );
}