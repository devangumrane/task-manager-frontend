import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: null,
  user: null,
  isBootstrapped: false,

  setAuth: (token, user) => {
    set({ accessToken: token, user });
    localStorage.setItem("token", token);
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    set({ accessToken: null, user: null, isBootstrapped: true });
    window.location.replace("/login");
  },

  bootstrap: (token) => {
    set({
      accessToken: token,
      isBootstrapped: true,
    });
  },
}));
