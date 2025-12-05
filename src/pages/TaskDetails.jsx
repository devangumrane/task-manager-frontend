 import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "@/api/axios";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function TaskDetails() {
  const { workspaceId, projectId, taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTask() {
      try {
        const res = await axios.get(
          `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
        );
        setTask(res.data.data);
      } catch (err) {
        console.error("Failed to load task:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTask();
  }, [workspaceId, projectId, taskId]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Loading task...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="p-6">
        <p className="text-red-500">Task not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>
            Priority: <strong>{task.priority}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            {task.description || "No description provided."}
          </p>

          <div className="text-xs text-muted-foreground">
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            {task.updatedAt && (
              <p>Updated At: {new Date(task.updatedAt).toLocaleString()}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card>
        <CardHeader>
          <CardTitle>Attachments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon…</p>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon…</p>
        </CardContent>
      </Card>
    </div>
  );
}
