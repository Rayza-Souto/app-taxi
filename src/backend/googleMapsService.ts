import axios from "axios";

export const calculateRoute = async (origin: string, destination: string) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

  const response = await axios.post(
    url,
    {
      origin: { location: { address: origin } },
      destination: { location: { address: destination } },
      travelMode: "DRIVE",
    },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  const data = response.data;
  const distance = data.routes[0]?.legs[0]?.distanceMeters / 1000; // km
  const duration = data.routes[0]?.legs[0]?.duration;

  return { distance, duration, fullResponse: data };
};
