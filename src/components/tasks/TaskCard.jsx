import { Link } from "react-router-dom";
import { ROUTES } from "../../router/paths";

export default function TaskCard({ task, onStatusChange }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-2">
      {/* Title */}
      <h3 className="font-medium">{task.title}</h3>

      {/* Assignee */}
      <div className="text-xs">
        {task.assigned ? (
          <Link
            to={ROUTES.USER_PROFILE(task.assigned.id)}
            className="text-blue-600 hover:underline"
          >
            Assigned to {task.assigned.name}
          </Link>
        ) : (
          <span className="text-gray-400">Unassigned</span>
        )}
      </div>

      {/* Status */}
      <p className="text-xs text-gray-500">Status: {task.status}</p>

      {/* Status actions */}
      <div className="flex gap-2 text-sm">
        {task.status !== "todo" && (
          <button
            onClick={() => onStatusChange(task.id, "todo")}
            className="hover:underline"
          >
            ← Todo
          </button>
        )}

        {task.status !== "in_progress" && (
          <button
            onClick={() => onStatusChange(task.id, "in_progress")}
            className="hover:underline"
          >
            In Progress
          </button>
        )}

        {task.status !== "done" && (
          <button
            onClick={() => onStatusChange(task.id, "done")}
            className="hover:underline"
          >
            Done →
          </button>
        )}
      </div>
    </div>
  );
}
