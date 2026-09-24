import { getWikiSummary } from "./wikipediaApi";

const GEOSEARCH_URL = "https://en.wikipedia.org/w/api.php";
const WIKIPEDIA_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary";

// Avoids re-fetching when the user switches tabs or revisits a section.
// Negative results are cached too, so missing photos don't trigger repeat requests.
const imageCache = new Map();

// Strategy 1 — a Wikipedia article that matches the place's own name.
async function imageFromPlaceName(name, { signal } = {}) {
  const summary = await getWikiSummary(name, undefined, { signal });
  return summary?.imageUrl ?? null;
}

// Strategy 2 — the nearest geolocated Wikipedia article, then its thumbnail.
async function imageFromNearbyArticle(latitude, longitude, { signal } = {}) {
  const searchUrl =
    `${GEOSEARCH_URL}?action=query&list=geosearch` +
    `&gscoord=${latitude}%7C${longitude}&gsradius=500&gslimit=1&format=json&origin=*`;

  const searchResponse = await fetch(searchUrl, { signal });
  if (!searchResponse.ok) {
    throw new Error(`Wikipedia geosearch failed: ${searchResponse.status}`);
  }
  const searchData = await searchResponse.json();
  const title = searchData.query?.geosearch?.[0]?.title;
  if (!title) return null;

  const summaryResponse = await fetch(
    `${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(title)}`,
    { signal }
  );
  if (summaryResponse.status === 404) return null;
  if (!summaryResponse.ok) {
    throw new Error(`Wikipedia summary failed: ${summaryResponse.status}`);
  }
  const summary = await summaryResponse.json();
  return summary.thumbnail?.source ?? null;
}

// Resolves the best available photo for a place (attraction, restaurant or hotel).
// Tries the place's own article first, then the nearest geolocated article.
// Returns null when nothing is found so the UI can render a placeholder.
export async function getPlaceImage({ name, latitude, longitude }, { signal } = {}) {
  const cacheKey = `${name}|${latitude}|${longitude}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey);

  const strategies = [() => imageFromPlaceName(name, { signal })];
  if (latitude != null && longitude != null) {
    strategies.push(() => imageFromNearbyArticle(latitude, longitude, { signal }));
  }

  for (const runStrategy of strategies) {
    try {
      const imageUrl = await runStrategy();
      if (imageUrl) {
        imageCache.set(cacheKey, imageUrl);
        return imageUrl;
      }
    } catch (error) {
      if (error.name === "AbortError") throw error;
      // otherwise fall through to the next strategy
    }
  }

  imageCache.set(cacheKey, null);
  return null;
}