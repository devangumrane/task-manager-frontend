// src/components/layout/DashboardLayout.jsx

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-full min-h-screen">
      {/* LEFT: Sidebar */}
      <Sidebar />

      {/* RIGHT: Topbar + Page Content */}
      <div className="flex-1 flex flex-col">
        {/* NEW TOPBAR WILL NOW RENDER */}
        <Topbar />

        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
