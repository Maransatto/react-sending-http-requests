import { useEffect, useState } from "react";

export default function useFetch(fetchFn, initialValue) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const places = await fetchFn();
        setFetchedData(places);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      }
      setIsLoading(false);
    }

    fetchPlaces();
  }, [fetchFn]);

  return {
    isLoading,
    error,
    fetchedData,
  };
}
