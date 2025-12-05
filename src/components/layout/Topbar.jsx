// src/components/layout/Topbar.jsx
import ThemeToggle from "../ThemeToggle";
import { useAuthStore } from "../../store/authStore";

export default function Topbar() {
  const logout = useAuthStore(state => state.logout);

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4">
      <div></div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <button
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
