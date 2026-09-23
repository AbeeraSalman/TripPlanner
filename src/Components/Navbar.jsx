import { NavLink } from "react-router-dom";
import { Menu, X, MapPin, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/trips", label: "Trips" },
  { to: "/saved", label: "Saved" },
  { to: "/settings", label: "Settings" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logOut } = useAuth();

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
            <MapPin size={18} />
          </span>
          TripPlanner
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="text-sm text-slate-500">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={logOut} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100">
                <LogOut size={14} />
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Sign In</NavLink>
              <NavLink to="/signup" className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">Sign Up</NavLink>
            </>
          )}
        </div>

        <button onClick={() => setMobileOpen((p) => !p)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <ul className="flex flex-col gap-1 border-t border-slate-100 px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} onClick={() => setMobileOpen(false)} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-2 border-t border-slate-100 pt-2">
            {user ? (
              <button onClick={() => { logOut(); setMobileOpen(false); }} className="flex w-full items-center gap-1.5 rounded-lg px-4 py-2 text-sm text-slate-600">
                <LogOut size={14} /> Log out ({user.name.split(" ")[0]})
              </button>
            ) : (
              <div className="flex gap-2 px-4">
                <NavLink to="/signin" onClick={() => setMobileOpen(false)} className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-sm font-medium">Sign In</NavLink>
                <NavLink to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 rounded-lg bg-indigo-600 py-2 text-center text-sm font-medium text-white">Sign Up</NavLink>
              </div>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}