import { useState } from "react";
import { AlertCircle, MapPin } from "lucide-react";
import DestinationCard from "../destination/DestinationCard";
import { useCountries } from "../../hooks/useCountries";

const PAGE_SIZE = 8;

export default function CountryBrowse() {
  const { countries, status } = useCountries();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = countries.slice(0, visibleCount);
  const hasMore = visibleCount < countries.length;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">
          Around the globe
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Browse by country
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Every capital city with a live weather and photo preview — open a card for the full
          guide.
        </p>
      </div>

      {status === "loading" && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-2xl bg-slate-200/80 dark:bg-slate-700/60"
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center dark:border-red-900/40 dark:bg-red-950/40">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 dark:bg-red-900/50">
            <AlertCircle size={24} />
          </span>
          <div>
            <p className="font-semibold text-red-700 dark:text-red-300">
              We couldn&apos;t load countries.
            </p>
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              Check your connection and refresh the page to try again.
            </p>
          </div>
        </div>
      )}

      {status === "empty" && (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-800">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-slate-700">
            <MapPin size={24} />
          </span>
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            No destinations to show right now.
          </p>
        </div>
      )}

      {status === "success" && (
        <>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((place) => (
              <DestinationCard key={place.id} place={place} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-indigo-600 shadow-md ring-1 ring-indigo-100 transition hover:bg-indigo-50 dark:bg-slate-800 dark:text-indigo-300 dark:ring-slate-700"
              >
                Show more countries
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}