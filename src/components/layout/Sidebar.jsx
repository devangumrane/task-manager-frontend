// src/components/layout/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const { data: workspaces } = useWorkspaces();
  const navigate = useNavigate();

  return (
    <aside className="w-64 border-r bg-card h-screen flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Task Manager</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <h2 classname="text-xs uppercase text-muted-foreground mb-2">Workspaces</h2>
          <div className="space-y-1">
            {workspaces?.map(ws => (
              <Button
                key={ws.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate(`/workspaces/${ws.id}`)}
              >
                {ws.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t text-sm text-muted-foreground">
        © 2025
      </div>
    </aside>
  );
}
