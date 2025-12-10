// src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Grid, Users, FileText } from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/", icon: Home },
  { label: "Workspaces", to: "/workspaces", icon: Users },
  { label: "Projects", to: "/projects", icon: Grid },
  { label: "Activity", to: "/activity", icon: FileText },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sidebar-collapsed")) || false;
    } catch {
      return false;
    }
  });
  const location = useLocation();

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
    } catch {}
  }, [collapsed]);

  return (
    <aside
      className={`flex-shrink-0 h-screen sticky top-0 left-0 z-20 bg-card border-r
        ${collapsed ? "w-16" : "w-64"} transition-all duration-200`}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col">
        {/* Brand / Toggle */}
        <div className="flex items-center justify-between px-3 h-16 border-b">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center font-semibold text-lg ${
                collapsed ? "w-8" : ""
              }`}
            >
              {/* Mini logo */}
              <div className="w-8 h-8 rounded bg-primary-foreground text-primary flex items-center justify-center">
                {/* initial or icon */}
                <span className="text-xs">TM</span>
              </div>
            </div>

            {!collapsed && <span className="ml-2">Task Manager</span>}
          </div>

          <button
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed((s) => !s)}
            className="p-2 rounded hover:bg-muted/25"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-auto px-1 py-3">
          <ul className="space-y-1">
            {nav.map((item) => {
              const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm
                      ${active ? "bg-primary/10 text-primary-foreground" : "text-muted-foreground hover:bg-muted/40"}
                      ${collapsed ? "justify-center" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={18} className={`${active ? "text-primary" : ""}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t">
          <button
            onClick={() => {
              // simple logout placeholder
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="w-full text-sm p-2 rounded hover:bg-muted/40"
          >
            {!collapsed ? "Logout" : "🚪"}
          </button>
        </div>
      </div>
    </aside>
  );
}
