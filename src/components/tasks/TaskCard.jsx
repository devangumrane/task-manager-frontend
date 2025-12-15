// src/components/tasks/TaskCard.jsx
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../router/paths";

export default function TaskCard({ task, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        if (typeof onDragStart === "function") {
          onDragStart(e, task);
        }
      }}
      className="p-4 bg-white shadow rounded-lg cursor-grab hover:bg-gray-50 transition"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.status}</p>
    </div>
  );
}
