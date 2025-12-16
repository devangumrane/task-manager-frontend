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
    queryFn: async () => {
      const res = await getTasksByProject(workspaceId, projectId);
      return Array.isArray(res) ? res : res?.data ?? [];
    },
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
      updateTaskStatus(workspaceId, projectId, taskId, payload),

    // 🚀 OPTIMISTIC UPDATE
    onMutate: async ({ taskId, payload }) => {
      await qc.cancelQueries(["projectTasks", workspaceId, projectId]);

      const previousTasks = qc.getQueryData([
        "projectTasks",
        workspaceId,
        projectId,
      ]);

      qc.setQueryData(["projectTasks", workspaceId, projectId], (old) => {
        if (!Array.isArray(old)) return old;

        return old.map((task) =>
          task.id === taskId ? { ...task, ...payload } : task
        );
      });

      return { previousTasks };
    },

    // ❌ ROLLBACK ON ERROR
    onError: (_err, _vars, context) => {
      qc.setQueryData(
        ["projectTasks", workspaceId, projectId],
        context.previousTasks
      );
    },

    // ✅ SYNC WITH SERVER
    onSettled: () => {
      qc.invalidateQueries(["projectTasks", workspaceId, projectId]);
    },
  });
};
