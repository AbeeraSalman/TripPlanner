import { useState } from "react";
import { AlertCircle, Lock } from "lucide-react";

export default function AuthForm({ mode, onSubmit, error }) {
  const isSignUp = mode === "signup";
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-900/60";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <div>
          <label htmlFor="auth-name" className={labelClass}>
            Full Name
          </label>
          <input
            id="auth-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label htmlFor="auth-email" className={labelClass}>
          Email
        </label>
        <input
          id="auth-email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(event) => handleChange("email", event.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="auth-password" className={labelClass}>
          Password
        </label>
        <input
          id="auth-password"
          type="password"
          required
          minLength={6}
          autoComplete={isSignUp ? "new-password" : "current-password"}
          value={form.password}
          onChange={(event) => handleChange("password", event.target.value)}
          placeholder="At least 6 characters"
          className={inputClass}
        />
      </div>

      {error && (
        <p className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-[0.99]"
      >
        {isSignUp ? "Create Account" : "Sign In"}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <Lock size={12} />
        Your account is stored locally on this device.
      </p>
    </form>
  );
}