const WIKIPEDIA_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary";

export async function getWikiSummary(placeName, region, { signal } = {}) {
  // Try the specific "City, Region" title first for disambiguation
  const specificTitle = region ? `${placeName}, ${region}` : placeName;

  let response = await fetch(`${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(specificTitle)}`, { signal });

  // Fall back to the plain city name if the specific title doesn't exist
  if (response.status === 404 && region) {
    response = await fetch(`${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(placeName)}`, { signal });
  }

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Wikipedia request failed: ${response.status}`);

  const data = await response.json();
  return {
    description: data.extract,
    imageUrl: data.thumbnail?.source ?? null,
  };
}