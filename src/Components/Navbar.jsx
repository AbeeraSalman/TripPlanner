import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, MapPin, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/destinations", label: "Destinations" },
  { to: "/trips", label: "Trips" },
  { to: "/saved", label: "Saved" },
  { to: "/settings", label: "Settings" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    setMobileOpen(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-300"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  const authBlock = user ? (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-slate-800 dark:text-indigo-300">
        {user.name.charAt(0).toUpperCase()}
      </span>
      <span className="max-w-[9rem] truncate text-sm font-medium text-slate-600 dark:text-slate-300">
        {user.name.split(" ")[0]}
      </span>
      <button
        onClick={handleLogOut}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white"
      >
        <LogOut size={14} /> Log out
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <NavLink
        to="/signin"
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700"
      >
        Sign Up
      </NavLink>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/85">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/25">
            <MapPin size={18} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            Trip<span className="text-indigo-600 dark:text-indigo-400">Planner</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">{authBlock}</div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/trips/new"
            className="rounded-full bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            Plan a Trip
          </Link>
          <button
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
            {user ? (
              <button
                onClick={handleLogOut}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                <LogOut size={14} /> Log out ({user.name.split(" ")[0]})
              </button>
            ) : (
              <div className="flex gap-2">
                <NavLink
                  to="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-lg bg-indigo-600 py-2 text-center text-sm font-medium text-white"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}