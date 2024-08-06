import AuthService from "@/services/AuthService";
import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true;
        const res = await AuthService.refreshToken();
        localStorage.setItem("token", res.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        console.log("user isn't authorized");
      }
    }
    throw error;
  }
);

export default api;
