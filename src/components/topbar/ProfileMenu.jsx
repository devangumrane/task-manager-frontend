import { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="relative">
      {/* Profile Avatar */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="flex items-center"
      >
        <img
          src="https://ui-avatars.com/api/?name=U&background=ddd&color=111&size=40"
          alt="User"
          className="w-8 h-8 rounded-full border"
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-48 bg-popover border rounded-md shadow z-50 text-sm"
          >
            <button className="w-full px-4 py-2 hover:bg-muted flex items-center gap-2">
              <User size={16} />
              Profile
            </button>

            <button className="w-full px-4 py-2 hover:bg-muted flex items-center gap-2">
              <Settings size={16} />
              Settings
            </button>

            <button
              className="w-full px-4 py-2 hover:bg-muted text-destructive flex items-center gap-2"
              onClick={logout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
