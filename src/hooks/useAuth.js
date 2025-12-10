// src/hooks/useAuth.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from "../services/authService";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export const useAuth = () => {
  const qc = useQueryClient();
  const { setAuth, clearAuth } = useAuthStore();

  // ---------------------------------------------------
  // LOGIN
  // ---------------------------------------------------
  const login = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      const { user, accessToken } = res.data.data;

      setAuth(accessToken, user);

      qc.invalidateQueries(["workspaces"]);
      toast.success("Logged in");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error?.message || "Login failed");
    },
  });

  // ---------------------------------------------------
  // REGISTER
  // ---------------------------------------------------
  const register = useMutation({
    mutationFn: registerApi,

    onSuccess: () => {
      toast.success("Account created — please login");
    },

    onError: (err) => {
      console.error("REGISTER ERROR >>>", err);
      toast.error(err?.response?.data?.error?.message || "Registration failed");
    },
  });

  // ---------------------------------------------------
  // LOGOUT
  // ---------------------------------------------------
  const logout = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      clearAuth();
      qc.clear();
      toast.success("Logged out");
    },

    // Even if server logout fails → still clear local state
    onError: () => {
      clearAuth();
      qc.clear();
    },
  });

  return {
    login,
    register,
    logout,
  };
};
