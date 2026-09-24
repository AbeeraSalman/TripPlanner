import { Link } from "react-router-dom";
import { MapPin, Compass, Heart } from "lucide-react";

const exploreLinks = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/signin", label: "Sign in" },
];

const accountLinks = [
  { to: "/trips", label: "Trips" },
  { to: "/saved", label: "Saved places" },
  { to: "/settings", label: "Settings" },
  { to: "/signup", label: "Create account" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
              <MapPin size={18} />
            </span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              Trip<span className="text-indigo-600">Planner</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Discover destinations, plan day-by-day itineraries and keep every expense under
            control — all in one place.
          </p>
        </div>

        <div>
          <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Compass size={13} /> Explore
          </h3>
          <ul className="mt-3 space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Heart size={13} /> Your account
          </h3>
          <ul className="mt-3 space-y-2">
            {accountLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400 dark:border-slate-800">
        © {new Date().getFullYear()} TripPlanner — plan smarter, travel better.
      </div>
    </footer>
  );
}