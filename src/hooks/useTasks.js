// src/hooks/useTasks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasksByProject,
  getTaskById,
  createTask,
  updateTaskStatus,
} from "../services/taskService";

export const useProjectTasks = (workspaceId, projectId) => {
  return useQuery({
    queryKey: ["projectTasks", workspaceId, projectId],
    queryFn: () => getTasksByProject(workspaceId, projectId),
    enabled: !!workspaceId && !!projectId,
  });
};

export const useTask = (workspaceId, projectId, taskId) => {
  return useQuery({
    queryKey: ["task", workspaceId, projectId, taskId],
    queryFn: () => getTaskById(workspaceId, projectId, taskId),
    enabled: !!workspaceId && !!projectId && !!taskId,
  });
};

export const useCreateTask = (workspaceId, projectId) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createTask(workspaceId, projectId, payload),
    onSuccess: () => {
      qc.invalidateQueries(["projectTasks", workspaceId, projectId]);
    },
  });
};

export const useUpdateTaskStatus = (workspaceId, projectId) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }) =>
      api.patch(
        `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
        payload
      ),

    onSuccess: () => {
      qc.invalidateQueries(["projectTasks", workspaceId, projectId]);
    },
  });
};
