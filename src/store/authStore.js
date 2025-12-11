import { create } from "zustand";

function safeParseUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined" || raw === "null") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("token") || null,
  user: safeParseUser(),

  setAuth: (accessToken, user) => {
    if (!user) user = useAuthStore.getState().user;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    set({ accessToken, user });
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ accessToken: null, user: null });
  },
}));
