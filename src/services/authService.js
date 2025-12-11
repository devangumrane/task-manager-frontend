// src/services/authService.js
import api from "./api";

export const login = async (payload) => {
  return api.post("/auth/login", payload);
};

export const register = async (payload) => {
  return api.post("/auth/register", payload);
};

export const logout = async () => {
  return api.post("/auth/logout");
};
