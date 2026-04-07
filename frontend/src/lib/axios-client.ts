import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) return `${import.meta.env.VITE_API_URL}/api/v1`;
  return "/api/v1";
};

export const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - clearing auth state");
      localStorage.removeItem("auth-storage");
    }
    return Promise.reject(error);
  }
);
