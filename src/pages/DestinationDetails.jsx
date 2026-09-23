import { useLocation, useParams, Link } from "react-router-dom";
import { Landmark, Utensils, Hotel } from "lucide-react";
import WeatherCard from "../Components/destination/WeatherCard";
import WikiSummaryCard from "../Components/destination/WikiSummaryCard";
import PlacesSection from "../Components/destination/placesSections"
import SaveButton from "../Components/common/saveButton";

export default function DestinationDetails() {
  const { destinationId } = useParams();
  const { state: place } = useLocation();

  if (!place) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 px-4 text-center">
        <p className="text-sm text-slate-600">
          We don't have details for this destination yet.
        </p>
        <Link to="/destinations" className="text-sm font-medium text-indigo-600 hover:underline">
          ← Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-10 text-white sm:px-6">
        <Link to="/destinations" className="text-sm text-indigo-100 hover:text-white">
          ← Back to search
        </Link>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{place.name}</h1>
        <p className="text-indigo-100">
          {[place.admin1, place.country].filter(Boolean).join(", ")}
        </p>
        <div className="mt-3">
          <SaveButton
            item={{
              id: `destination-${destinationId}`,
              type: "destination",
              name: place.name,
              subtitle: place.country,
            }}
          />
        </div>
      </div>

      {/* Content grid */}
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <WeatherCard latitude={place.latitude} longitude={place.longitude} />

        <div className="sm:col-span-2 lg:col-span-2">
          <WikiSummaryCard placeName={place.name} region={place.admin1} />
        </div>

        <PlacesSection
          title="Attractions"
          icon={Landmark}
          latitude={place.latitude}
          longitude={place.longitude}
          category="tourism.sights"
        />
        <PlacesSection
          title="Restaurants"
          icon={Utensils}
          latitude={place.latitude}
          longitude={place.longitude}
          category="catering.restaurant"
        />
        <PlacesSection
          title="Hotels"
          icon={Hotel}
          latitude={place.latitude}
          longitude={place.longitude}
          category="accommodation.hotel"
        />
      </div>
    </div>
  );
}