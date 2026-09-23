const WIKIPEDIA_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary";

export async function getWikiSummary(placeName, region, { signal } = {}) {
  // City names are usually the most reliable title, especially when the region is a continent.
  let response = await fetch(`${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(placeName)}`, { signal });

  // Use the regional title only when the plain city title does not exist.
  if (response.status === 404 && region) {
    response = await fetch(`${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(`${placeName}, ${region}`)}`, { signal });
  }

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Wikipedia request failed: ${response.status}`);

  const data = await response.json();
  return {
    description: data.extract,
    imageUrl: data.thumbnail?.source ?? null,
  };
}