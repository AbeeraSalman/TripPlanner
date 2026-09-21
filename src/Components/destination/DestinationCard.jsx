import { Link } from "react-router-dom";
import { MapPin, ThermometerSun } from "lucide-react";
import { useDestinationPreview } from "../../hooks/useDestinationPreview";

export default function DestinationCard({ place }) {
  const { data, status } = useDestinationPreview(place);

  return (
    <Link
      to={`/destinations/${place.id}`}
      state={place}
      className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="h-36 w-full overflow-hidden bg-slate-100">
        {status === "loading" && <div className="h-full w-full animate-pulse bg-slate-200" />}

        {status === "success" && data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={place.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}

        {status === "success" && !data.imageUrl && (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <MapPin size={28} />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">{place.name}</h3>
          {status === "success" && data.temperature != null && (
            <span className="flex items-center gap-1 text-xs font-medium text-indigo-600">
              <ThermometerSun size={14} />
              {Math.round(data.temperature)}°C
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{place.country}</p>
      </div>
    </Link>
  );
}