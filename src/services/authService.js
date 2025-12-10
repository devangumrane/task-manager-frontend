// src/services/authService.js
import api from "./api";

/**
 * LOGIN
 * Backend response shape:
 * {
 *   success: true,
 *   data: { user, accessToken, refreshToken }
 * }
 */
export const login = async (payload) => {
  return api.post("/auth/login", payload);
};

/**
 * REGISTER
 */
export const register = async (payload) => {
  return api.post("/auth/register", payload);
};

/**
 * LOGOUT
 */
export const logout = async () => {
  return api.post("/auth/logout");
};
