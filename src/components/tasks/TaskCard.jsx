// src/components/tasks/TaskCard.jsx
export default function TaskCard({ task, onStatusChange }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-2">
      <h3 className="font-medium">{task.title}</h3>
      <p className="text-xs text-gray-500">Status: {task.status}</p>

      <div className="flex gap-2 text-sm">
        {task.status !== "todo" && (
          <button onClick={() => onStatusChange(task.id, "todo")}>
            ← Todo
          </button>
        )}

        {task.status !== "in_progress" && (
          <button onClick={() => onStatusChange(task.id, "in_progress")}>
            In Progress
          </button>
        )}

        {task.status !== "done" && (
          <button onClick={() => onStatusChange(task.id, "done")}>
            Done →
          </button>
        )}
      </div>
    </div>
  );
}