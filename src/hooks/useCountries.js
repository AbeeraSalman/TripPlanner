import { useState, useEffect } from "react";
import { getAllCountries } from "../Services/countriesApi";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    getAllCountries({ signal: controller.signal })
      .then((data) => {
        setCountries(data);
        setStatus(data.length === 0 ? "empty" : "success");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, []);

  return { countries, status };
}