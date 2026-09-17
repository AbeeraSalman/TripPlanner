import { useState, useEffect } from "react";

export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If value changes again before delay elapses, cancel the pending timeout
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}