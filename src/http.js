const BASE_URL = "http://localhost:3000";
const BASE_HEADERS = {
  "Content-Type": "application/json",
};

export async function fetchAvailablePlaces() {
  const response = await fetch(`${BASE_URL}/places`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch(`${BASE_URL}/user-places`, {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: BASE_HEADERS,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return data.message;
}

export async function fetchUserPlaces() {
  const response = await fetch(`${BASE_URL}/user-places`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return data.places;
}
