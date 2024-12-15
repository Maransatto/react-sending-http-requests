import { useEffect } from "react";
import ErrorPage from "./Error.jsx";
import Places from "./Places.jsx";

import useFetch from "../hooks/useFetch.js";
import { fetchAvailablePlaces } from "../http.js";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // navigator.geolocation.getCurrentPosition((position) => {
  //   const sortedPlaces = sortPlacesByDistance(
  //     places,
  //     position.coords.latitude,
  //     position.coords.longitude
  //   );
  //   setAvailablePlaces(sortedPlaces);
  //   setIsLoading(false);
  // });

  const {
    isLoading,
    error,
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
  } = useFetch(fetchAvailablePlaces, []);

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
