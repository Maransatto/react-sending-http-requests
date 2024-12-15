import ErrorPage from "./Error.jsx";
import Places from "./Places.jsx";

import useFetch from "../hooks/useFetch.js";
import { fetchAvailablePlaces } from "../http.js";
import { sortPlacesByDistance } from "../loc.js";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        resolve(sortedPlaces);
      },
      (error) => reject(error)
    );
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isLoading,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
