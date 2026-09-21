import { BookOpen, AlertCircle } from "lucide-react";
import { useWikiSummary } from "../../hooks/useVikiSummary";

export default function WikiSummaryCard({ placeName,region }) {
  const { summary, status, retry } = useWikiSummary(placeName);

  if (status === "idle") return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      {status === "success" && summary?.imageUrl && (
        <img
          src={summary.imageUrl}
          alt={placeName}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-5">
        <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <BookOpen size={16} className="text-indigo-500" />
          About {placeName}
        </h2>

        {status === "loading" && (
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle size={16} />
              <p className="text-sm font-medium">Couldn't load description.</p>
            </div>
            <button
              onClick={retry}
              className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Retry
            </button>
          </div>
        )}

        {status === "empty" && (
          <p className="text-sm text-slate-400">No description available for this place.</p>
        )}

        {status === "success" && summary && (
          <p className="text-sm leading-relaxed text-slate-600">{summary.description}</p>
        )}
      </div>
    </div>
  );
}