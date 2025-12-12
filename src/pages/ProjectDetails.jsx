import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById, getTasksByProject } from "../services/projectService";
import TaskCard from "../components/tasks/TaskCard";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "../router/paths";
import CreateTaskDialog from "../components/tasks/CreateTaskDialog";

export default function ProjectDetails() {
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();

  const [openTaskDialog, setOpenTaskDialog] = useState(false);

  // --- PROJECT QUERY ---
  const { data: rawProject, isLoading: loadingProject } = useQuery({
    queryKey: ["project", workspaceId, projectId],
    queryFn: () => getProjectById(workspaceId, projectId),
  });

  // Normalize API response shape
  const project = rawProject?.data || rawProject || null;

  // --- TASKS QUERY ---
  const { data: rawTasks, isLoading: loadingTasks } = useQuery({
    queryKey: ["projectTasks", workspaceId, projectId],
    queryFn: () => getTasksByProject(workspaceId, projectId),
  });

  const tasks = Array.isArray(rawTasks?.data) ? rawTasks.data : rawTasks || [];

  if (loadingProject) return <p>Loading project…</p>;
  if (!project) return <p>Project not found.</p>;

  // --- Kanban Columns ---
  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(ROUTES.WORKSPACE(workspaceId))}
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Project Header */}
      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-semibold">
          {project.title || project.name}
        </h1>

        {project.description && (
          <p className="text-gray-600 mt-2">{project.description}</p>
        )}
      </div>

      {/* Tasks Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button
          className="px-3 py-1 text-sm bg-primary text-white rounded"
          onClick={() => setOpenTaskDialog(true)}
        >
          + Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <KanbanColumn title="Todo" tasks={columns.todo} />
        <KanbanColumn title="In Progress" tasks={columns.in_progress} />
        <KanbanColumn title="Done" tasks={columns.done} />
      </div>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        open={openTaskDialog}
        onClose={() => setOpenTaskDialog(false)}
        workspaceId={workspaceId}
        projectId={projectId}
      />
    </div>
  );
}

function KanbanColumn({ title, tasks }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border min-h-[300px]">
      <h3 className="font-semibold mb-3">{title}</h3>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-gray-500">No tasks</p>
        )}
      </div>
    </div>
  );
}
