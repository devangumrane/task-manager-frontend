import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

import DashboardLayout from "./components/layout/DashboardLayout";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Dashboard from "./pages/Dashboard";
import WorkspaceDetails from "./pages/WorkspaceDetails";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";

export function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.accessToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <>
      {/* <div className="bg-blue-500 text-white p-4">Tailwind Test</div> */}

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Workspace */}
        <Route
          path="/workspaces/:workspaceId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <WorkspaceDetails />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Project */}
        <Route
          path="/workspaces/:workspaceId/projects/:projectId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProjectDetails />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Task */}
        <Route
          path="/workspaces/:workspaceId/projects/:projectId/tasks/:taskId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TaskDetails />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
