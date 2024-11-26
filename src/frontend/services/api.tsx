import axios from "axios";

const api = axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/directions/json`,
    headers: { 'Content-Type': 'application/json' },
  });

export default api;