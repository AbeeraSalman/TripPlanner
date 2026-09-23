import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import AuthForm from "../Components/auth/AuthForm";
import { useAuth } from "../hooks/useAuth";

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (form) => {
    try {
      signIn(form);
      navigate("/trips");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-8">
      <div className="mb-6 text-center">
        <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
          <MapPin size={20} />
        </span>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-500">Sign in to plan your next trip.</p>
      </div>
      <AuthForm mode="signin" onSubmit={handleSubmit} error={error} />
      <p className="mt-4 text-center text-sm text-slate-500">
        Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}