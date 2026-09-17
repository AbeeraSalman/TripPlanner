const GEOCODING_BASE_URL = import.meta.env.VITE_GEOCODING_BASE_URL;

export async function searchDestinations(query, { signal } = {}) {
  const url = `${GEOCODING_BASE_URL}/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.status}`);
  }

  const data = await response.json();

  // Open-Meteo returns no "results" key at all when there are zero matches
  return data.results ?? [];
}