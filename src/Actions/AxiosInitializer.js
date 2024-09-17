import axios from "axios";
import { getAuthToken } from "./TokenInitilizer";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const myrouter = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

myrouter.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
