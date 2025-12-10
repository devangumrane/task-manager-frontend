import { useRef, useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";

import SearchInput from "../topbar/SearchInput";
import NotificationsMenu from "../topbar/NotificationsMenu";
import ProfileMenu from "../topbar/ProfileMenu";
import CommandPalette from "../topbar/CommandPalette";

export default function Topbar() {
  const { theme, toggle } = useTheme();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const searchRef = useRef(null);

  // ------------------------------------------------------
  // KEYBOARD SHORTCUTS
  // "/" → focus search
  // "Ctrl+K" or "Cmd+K" → open command palette
  // ------------------------------------------------------
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && !e.target.closest("input")) {
        e.preventDefault();
        searchRef.current?.focus();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ------------------------------------------------------
  // AUTO-CLOSE MENUS ON PAGE SCROLL
  // ------------------------------------------------------
  useEffect(() => {
    const close = () => {
      setProfileOpen(false);
      setNotificationsOpen(false);
    };
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <>
      <header className="h-16 flex items-center justify-between px-6 border-b bg-card relative z-30 shadow-sm">
        {/* -------------------- LEFT -------------------- */}
        <div className="flex items-center gap-4">
          {/* Page Title */}
          <div className="text-lg font-semibold tracking-tight">Overview</div>

          {/* Search */}
          <div className="hidden md:flex">
            <SearchInput searchRef={searchRef} />
          </div>
        </div>

        {/* -------------------- RIGHT ------------------- */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="p-2 rounded hover:bg-muted transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* Notifications */}
          <NotificationsMenu
            open={notificationsOpen}
            setOpen={setNotificationsOpen}
            closeProfile={() => setProfileOpen(false)}
          />

          {/* Profile Menu */}
          <ProfileMenu
            open={profileOpen}
            setOpen={setProfileOpen}
            closeNotifications={() => setNotificationsOpen(false)}
          />
        </div>
      </header>

      {/* GLOBAL COMMAND PALETTE */}
      <CommandPalette open={commandOpen} onClose={setCommandOpen} />
    </>
  );
}
