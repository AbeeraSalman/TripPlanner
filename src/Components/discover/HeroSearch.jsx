import { useEffect, useState } from "react";
import { CloudSun, Landmark, Search, Sparkles, Utensils } from "lucide-react";
import DestinationSearchResults from "../destination/DestinationSearchResults";
import { useDestinationSearch } from "../../hooks/useDestinationSearch";
import { CATEGORIES, POPULAR_SEARCHES } from "./categories";
import heroImg from "../../assets/hero.png";

// Small value strip under the hero — mirrors what the landing page actually delivers.
const FEATURES = [
  { icon: CloudSun, label: "Live weather" },
  { icon: Landmark, label: "Popular attractions" },
  { icon: Utensils, label: "Restaurants & hotels" },
];

export default function HeroSearch({ category, onCategoryChange, onSelectDestination }) {
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const { results, status, error, retry } = useDestinationSearch(query);
  const showDropdown = query.trim().length > 0;
  const activeTab = CATEGORIES.find((tab) => tab.id === category) ?? CATEGORIES[0];

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const handleQueryChange = (value) => {
    setQuery(value);
    setNotice("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === "success" && results[0]) {
      setNotice("");
      onSelectDestination(results[0]);
    } else if (status === "idle" || !query.trim()) {
      setNotice("Type a destination name to search.");
    }
    // loading / error / empty feedback already lives in the dropdown
  };

  return (
    <section className="relative overflow-hidden text-white">
      {/* Layered background: gradient + photo + glows + scrim */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-800 to-blue-700" />
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-indigo-900/50 to-indigo-950/80" />

      <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-16 text-center sm:pt-20">
        <p className="mx-auto mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
          <Sparkles size={14} />
          TripPlanner — plan smarter, travel better
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Where will you{" "}
          <span className="bg-gradient-to-r from-sky-300 to-indigo-200 bg-clip-text text-transparent">
            go next?
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-indigo-100 sm:text-base">
          Search any city or country, then explore its weather, attractions, restaurants and
          hotels — all on one page.
        </p>

        {/* Glass category tabs */}
        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Explore categories"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur"
          >
            {CATEGORIES.map(({ id, label, icon: Icon }) => {
              const active = category === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onCategoryChange(id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    active
                      ? "bg-white text-indigo-700 shadow"
                      : "text-indigo-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pill search */}
        <form onSubmit={handleSubmit} role="search" className="relative mx-auto mt-6 w-full max-w-2xl">
          <div className="flex items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-2xl ring-1 ring-white/60 transition focus-within:ring-2 focus-within:ring-sky-300">
            <Search size={20} className="shrink-0 text-slate-400" />
            <label htmlFor="landing-search" className="sr-only">
              Search destinations
            </label>
            <input
              id="landing-search"
              type="text"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder={activeTab.placeholder}
              autoComplete="off"
              className="min-w-0 flex-1 border-0 bg-transparent py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700 active:scale-95"
            >
              Search
            </button>
          </div>

          {showDropdown && (
            <div className="absolute left-0 right-0 top-full z-40 mt-3 max-h-96 overflow-y-auto rounded-3xl border border-slate-100 bg-white p-2 text-left shadow-2xl [&_ul]:mt-0">
              <DestinationSearchResults
                status={status}
                results={results}
                error={error}
                onRetry={retry}
              />
            </div>
          )}

          {notice && (
            <p role="status" className="mt-3 text-sm font-medium text-indigo-100">
              {notice}
            </p>
          )}
        </form>

        {/* Popular searches (SRS §3) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-200">
            Popular
          </span>
          {POPULAR_SEARCHES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => handleQueryChange(city)}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-indigo-50 transition hover:border-white/40 hover:bg-white/20"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Feature strip */}
      <div className="relative border-t border-white/10 bg-indigo-950/40 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 text-sm text-indigo-100">
          {FEATURES.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2">
              <Icon size={16} className="text-sky-300" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}