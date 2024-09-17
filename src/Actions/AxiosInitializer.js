import axios from "axios";
import { getAuthToken } from "./TokenInitilizer";

const baseURL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_URL;

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
