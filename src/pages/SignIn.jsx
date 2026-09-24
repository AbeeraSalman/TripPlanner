import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { CalendarDays, Compass, MapPin, Wallet } from "lucide-react";
import AuthForm from "../Components/auth/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const BENEFITS = [
  { icon: CalendarDays, title: "Day-by-day itineraries", text: "Plan every hour of every day." },
  { icon: Wallet, title: "Budget tracking", text: "Know what you spend, by category." },
  { icon: Compass, title: "Saved places", text: "Bookmark hotels, food and sights." },
];

export default function SignIn() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  // Where the guest wanted to go before being asked to sign in (default: landing)
  const from = location.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = (form) => {
    try {
      signIn(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-140px)] max-w-5xl items-center gap-10 px-4 py-12 lg:grid-cols-2">
      {/* Value panel */}
      <div className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 p-10 text-white lg:block">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10" />
        <div className="relative">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <MapPin size={24} />
          </span>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight">Welcome back, traveler.</h2>
          <p className="mt-2 text-sm text-indigo-100">
            Sign in to pick up your trips, itineraries and saved places exactly where you left
            them.
          </p>
          <ul className="mt-8 space-y-4">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Icon size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-indigo-100">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
          <div className="mb-6 text-center">
            <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/25">
              <MapPin size={21} />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Sign in to plan your next trip.
            </p>
          </div>
          <AuthForm mode="signin" onSubmit={handleSubmit} error={error} />
        </div>
        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            state={{ from: location.state?.from }}
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}