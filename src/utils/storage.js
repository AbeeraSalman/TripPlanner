export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    // corrupted JSON or storage blocked: start clean instead of crashing
    return fallback;
  }
}