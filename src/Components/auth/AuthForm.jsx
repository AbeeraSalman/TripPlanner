import { useState } from "react";

export default function AuthForm({ mode, onSubmit, error }) {
  const isSignUp = mode === "signup";
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
          <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Jane Doe" className={inputClass} />
        </div>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input type="email" required value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@example.com" className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
        <input type="password" required minLength={6} value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="••••••••" className={inputClass} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="w-full rounded-full bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
        {isSignUp ? "Create Account" : "Sign In"}
      </button>
    </form>
  );
}