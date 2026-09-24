import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Check, MapPin, Sparkles } from "lucide-react";
import AuthForm from "../Components/auth/AuthForm";
import { useAuth } from "../hooks/useAuth";

const PERKS = [
  "Create trips with day-by-day itineraries",
  "Track spending and stay under budget",
  "Save destinations, hotels & restaurants",
  "Your data stays on your device",
];

export default function SignUp() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  // Return the guest to the action that required an account (default: landing)
  const from = location.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = (form) => {
    try {
      signUp(form);
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
            <Sparkles size={24} />
          </span>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight">
            Your next adventure starts here.
          </h2>
          <p className="mt-2 text-sm text-indigo-100">
            Creating a trip, saving places or tracking a budget takes a free account — it only
            takes a few seconds.
          </p>
          <ul className="mt-8 space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                  <Check size={13} strokeWidth={3} />
                </span>
                {perk}
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
              Create your account
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Start planning trips in seconds.
            </p>
          </div>
          <AuthForm mode="signup" onSubmit={handleSubmit} error={error} />
        </div>
        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            state={{ from: location.state?.from }}
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}