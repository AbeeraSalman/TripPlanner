import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import HeroSearch from "../Components/discover/HeroSearch";
import TrendingDestinations from "../Components/discover/TrendingDestinations";
import ExplorePanel from "../Components/discover/ExplorePanel";
import CountryBrowse from "../Components/discover/CountryBrowse";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Home() {
  // Shared state: which category is active + which destination is being explored
  const [category, setCategory] = useState("all");
  const [destination, setDestination] = useState(null);
  const { user } = useAuth();

  // Selecting a destination (trending card or search submit) jumps to the explorer
  const handleSelect = useCallback((place) => {
    setDestination(place);
    requestAnimationFrame(() => scrollTo("explore"));
  }, []);

  // Hero tabs: switch category and move to the relevant section
  const handleHeroCategory = useCallback(
    (id) => {
      setCategory(id);
      scrollTo(destination ? "explore" : "trending");
    },
    [destination]
  );

  // Explorer segmented control: the user is already in the section — no scroll
  const handleExploreCategory = useCallback((id) => {
    setCategory(id);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <HeroSearch
        category={category}
        onCategoryChange={handleHeroCategory}
        onSelectDestination={handleSelect}
      />

      <TrendingDestinations selectedId={destination?.id} onSelect={handleSelect} />

      <section id="explore" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10">
        <ExplorePanel
          destination={destination}
          category={category}
          onCategoryChange={handleExploreCategory}
        />
      </section>

      <CountryBrowse />

      {/* Closing CTA — existing routes only */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 px-6 py-12 text-center text-white sm:px-12">
          <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/10" />
          <div className="relative">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to turn ideas into an itinerary?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-indigo-100">
              Save your favorite places, build a day-by-day plan and track your budget — all in
              Trips.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {user ? (
                <Link
                  to="/trips"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
                >
                  Go to my trips <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
                >
                  Create free account <ArrowRight size={16} />
                </Link>
              )}
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {user ? "Keep exploring" : "Browse destinations"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}