import { useLocation, useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useSaved } from "../../hooks/useSaved";
import { useAuth } from "../../hooks/useAuth";

// item needs: { id, type: "destination"|"attraction"|"restaurant"|"hotel", name, subtitle }
export default function SaveButton({ item, size = 18 }) {
  const { isSaved, toggleSaved } = useSaved();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const saved = isSaved(item.id);

  const handleClick = (event) => {
    event.preventDefault(); // in case it sits inside a <Link>
    event.stopPropagation();

    // Saving is an account feature — guests are asked to sign in first
    if (!user) {
      navigate("/signin", { state: { from: location } });
      return;
    }
    toggleSaved(item);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Remove from saved" : "Save this place"}
      className={`rounded-full p-1.5 transition-colors ${
        saved
          ? "bg-indigo-600 text-white"
          : "bg-white text-slate-400 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300"
      }`}
    >
      <Bookmark size={size} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}