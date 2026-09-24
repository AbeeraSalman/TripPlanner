const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const GEOAPIFY_BASE_URL = "https://api.geoapify.com/v2/places";

// category: "tourism.sights" | "catering.restaurant" | "accommodation.hotel"
export async function getNearbyPlaces(latitude, longitude, category, { signal } = {}) {
  const radiusInMeters = 5000;
  const url = `${GEOAPIFY_BASE_URL}?categories=${category}&filter=circle:${longitude},${latitude},${radiusInMeters}&limit=10&apiKey=${GEOAPIFY_API_KEY}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Places request failed: ${response.status}`);
  }

  const data = await response.json();

  // Geoapify returns GeoJSON — normalize to plain objects so components don't need to know that
  return data.features.map((feature) => ({
    id: feature.properties.place_id,
    name: feature.properties.name || "Unnamed place",
    address: feature.properties.address_line2 || feature.properties.formatted,
    distance: feature.properties.distance,
    latitude: feature.properties.lat,
    longitude: feature.properties.lon,
  }));
}
