import { useLocation, useParams, Link } from "react-router-dom";
import { ArrowLeft, Hotel, Landmark, Utensils } from "lucide-react";
import WeatherCard from "../Components/destination/WeatherCard";
import WikiSummaryCard from "../Components/destination/WikiSummaryCard";
import PlacesSection from "../Components/destination/placesSections";
import SaveButton from "../Components/common/saveButton";

export default function DestinationDetails() {
  const { destinationId } = useParams();
  const { state: place } = useLocation();

  if (!place) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-400 dark:bg-slate-800">
          <Landmark size={26} />
        </span>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          We don&apos;t have details for this destination yet.
        </p>
        <Link
          to="/destinations"
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 pb-12 dark:bg-slate-900">
      {/* Gradient hero header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 px-4 py-10 text-white sm:px-6">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm text-indigo-100 transition hover:text-white"
          >
            <ArrowLeft size={15} /> Back to search
          </Link>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold sm:text-4xl">{place.name}</h1>
              <p className="mt-1 text-sm text-indigo-100">
                {[place.admin1, place.country].filter(Boolean).join(" · ")}
              </p>
            </div>
            <SaveButton
              item={{
                id: `destination-${destinationId}`,
                type: "destination",
                name: place.name,
                subtitle: place.country,
                admin1: place.admin1,
                latitude: place.latitude,
                longitude: place.longitude,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-3">
        <WeatherCard latitude={place.latitude} longitude={place.longitude} />
        <div className="lg:col-span-2">
          <WikiSummaryCard placeName={place.name} region={place.admin1} />
        </div>
        <PlacesSection
          title="Attractions"
          icon={Landmark}
          latitude={place.latitude}
          longitude={place.longitude}
          category="tourism.sights"
          limit={3}
        />
        <PlacesSection
          title="Restaurants"
          icon={Utensils}
          latitude={place.latitude}
          longitude={place.longitude}
          category="catering.restaurant"
          limit={3}
        />
        <PlacesSection
          title="Hotels"
          icon={Hotel}
          latitude={place.latitude}
          longitude={place.longitude}
          category="accommodation.hotel"
          limit={3}
        />
      </div>
    </div>
  );
}