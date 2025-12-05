import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-hot-toast";

export function useAuth() {
  const setUser = useAuthStore((s) => s.setUser);

  const login = useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
    onSuccess: (res) => {
      const { accessToken, user } = res.data.data;
      localStorage.setItem("token", accessToken);
      setUser(user);
      toast.success("Logged in successfully!");
    },
    onError: () => toast.error("Invalid credentials"),
  });

  const register = useMutation({
    mutationFn: (data) => api.post("/auth/register", data),
    onSuccess: () => toast.success("Account created! Please log in."),
    onError: () => toast.error("Registration failed"),
  });

  return { login, register };
}
