// src/components/tasks/TaskCard.jsx
import { Link, useParams } from "react-router-dom";

export default function TaskCard({ task }) {
  const { workspaceId, projectId } = useParams();

  return (
    <Link
      to={`/workspaces/${workspaceId}/projects/${projectId}/tasks/${task.id}`}
      className="block"
    >
      <div className="p-4 bg-white shadow rounded-lg hover:bg-gray-50 transition">
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.status}</p>
      </div>
    </Link>
  );
}
