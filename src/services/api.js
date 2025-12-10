import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // MUST BE TRUE for cookie refresh
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshRes = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccess = refreshRes.data.data.accessToken;

        localStorage.setItem("token", newAccess);
        useAuthStore.setState({ accessToken: newAccess });

        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
