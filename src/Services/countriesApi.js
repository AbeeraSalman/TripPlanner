const COUNTRIES_URL = "https://raw.githubusercontent.com/mledoze/countries/master/countries.json";

export async function getAllCountries({ signal } = {}) {
  const response = await fetch(COUNTRIES_URL, { signal });
  if (!response.ok) throw new Error(`Countries request failed: ${response.status}`);

  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Countries API returned an invalid response.");

  return data
    .filter((c) => c.capital?.[0] && c.latlng?.length === 2)
    .map((c) => ({
      id: c.cca2,
      name: c.capital[0],
      country: c.name.common,
      admin1: c.region,
      latitude: c.latlng[0],
      longitude: c.latlng[1],
    }))
    .sort((a, b) => a.country.localeCompare(b.country));
}