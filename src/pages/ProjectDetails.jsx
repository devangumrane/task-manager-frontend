import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById, getTasksByProject } from "../services/projectService";
import TaskCard from "../components/tasks/TaskCard";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "../router/paths";
import CreateTaskDialog from "../components/tasks/CreateTaskDialog";
import { useUpdateTaskStatus } from "../hooks/useTasks";

export default function ProjectDetails() {
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();

  // ✅ ALL HOOKS FIRST (NO RETURNS BEFORE THIS)
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const updateTaskStatus = useUpdateTaskStatus(workspaceId, projectId);

  const { data: rawProject, isLoading: loadingProject } = useQuery({
    queryKey: ["project", workspaceId, projectId],
    queryFn: () => getProjectById(workspaceId, projectId),
  });

  const { data: rawTasks = [], isLoading: loadingTasks } = useQuery({
    queryKey: ["projectTasks", workspaceId, projectId],
    queryFn: () => getTasksByProject(workspaceId, projectId),
  });

  // ✅ Normalize AFTER hooks
  const project = rawProject?.data || rawProject || null;
  const tasks = Array.isArray(rawTasks?.data) ? rawTasks.data : rawTasks || [];

  // ✅ EARLY RETURNS AFTER ALL HOOKS
  if (loadingProject) return <p>Loading project…</p>;
  if (!project) return <p>Project not found.</p>;

  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", String(task.id));
    e.dataTransfer.setData("fromStatus", task.status);
  };

  const handleDropTask = (e, newStatus) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");
    const fromStatus = e.dataTransfer.getData("fromStatus");

    if (!taskId || fromStatus === newStatus) return;

    updateTaskStatus.mutate({
      taskId: Number(taskId),
      payload: { status: newStatus },
    });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(ROUTES.WORKSPACE(workspaceId))}
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-semibold">
          {project.title || project.name}
        </h1>
        {project.description && (
          <p className="text-gray-600 mt-2">{project.description}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button
          className="px-3 py-1 text-sm bg-primary text-white rounded"
          onClick={() => setOpenTaskDialog(true)}
        >
          + Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, list]) => (
          <KanbanColumn
            key={status}
            title={status.replace("_", " ").toUpperCase()}
            status={status}
            tasks={list}
            onDragStart={handleDragStart}
            onDrop={handleDropTask}
          />
        ))}
      </div>

      <CreateTaskDialog
        open={openTaskDialog}
        onClose={() => setOpenTaskDialog(false)}
        workspaceId={workspaceId}
        projectId={projectId}
      />
    </div>
  );
}

function KanbanColumn({ title, status, tasks, onDragStart, onDrop }) {
  return (
    <div
      className="bg-gray-50 p-4 rounded-lg border min-h-[300px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, status)}
    >
      <h3 className="font-semibold mb-3">{title}</h3>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-gray-500">No tasks</p>
        )}
      </div>
    </div>
  );
}
