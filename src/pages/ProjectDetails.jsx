import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById, getTasksByProject } from "../services/projectService";
import TaskCard from "../components/tasks/TaskCard";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetails() {
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ["project", workspaceId, projectId],
    queryFn: () => getProjectById(workspaceId, projectId),
  });

  const { data: tasks, isLoading: loadingTasks } = useQuery({
    queryKey: ["projectTasks", workspaceId, projectId],
    queryFn: () => getTasksByProject(workspaceId, projectId),
  });

  if (loadingProject) return <p>Loading project…</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Project Header */}
      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <p className="text-gray-600 mt-2">{project.description}</p>

        <div className="mt-4 text-sm text-gray-500">
          <p>
            Status: <span className="font-medium">{project.status}</span>
          </p>
          <p>Created: {new Date(project.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Tasks */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>

        {loadingTasks ? (
          <p>Loading tasks…</p>
        ) : tasks?.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
