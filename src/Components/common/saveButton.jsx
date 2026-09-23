import { Bookmark } from "lucide-react";
import { useSaved } from "../../hooks/useSaved";

// item needs: { id, type: "destination"|"attraction"|"restaurant"|"hotel", name, subtitle }
export default function SaveButton({ item, size = 18 }) {
  const { isSaved, toggleSaved } = useSaved();
  const saved = isSaved(item.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // in case it sits inside a <Link>
        e.stopPropagation();
        toggleSaved(item);
      }}
      aria-label={saved ? "Remove from saved" : "Save this place"}
      className={`rounded-full p-1.5 transition-colors ${
        saved ? "bg-indigo-600 text-white" : "bg-white text-slate-400 hover:text-indigo-600"
      }`}
    >
      <Bookmark size={size} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}