const WEATHER_BASE_URL = import.meta.env.VITE_OPEN_METEO_BASE_URL;

export async function getCurrentWeather(latitude, longitude, { signal } = {}) {
  const url = `${WEATHER_BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.current_weather;
}