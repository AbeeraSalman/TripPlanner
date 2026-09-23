import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import AuthForm from "../Components/auth/AuthForm";
import { useAuth } from "../hooks/useAuth";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (form) => {
    try {
      signUp(form);
      navigate("/");
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
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="text-sm text-slate-500">Start planning trips in seconds.</p>
      </div>
      <AuthForm mode="signup" onSubmit={handleSubmit} error={error} />
      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account? <Link to="/signin" className="font-medium text-indigo-600 hover:underline">Sign in</Link>
      </p>
    </div>
  );
}