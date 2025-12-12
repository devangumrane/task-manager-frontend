import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasksByProject, createTask } from "../services/taskService";

export const useProjectTasks = (workspaceId, projectId) => {
  return useQuery({
    queryKey: ["projectTasks", workspaceId, projectId],
    queryFn: () => getTasksByProject(workspaceId, projectId),
    enabled: !!workspaceId && !!projectId,
  });
};

export const useCreateTask = (workspaceId, projectId) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createTask(workspaceId, projectId, payload),

    onSuccess: () => {
      // Refresh Kanban board
      qc.invalidateQueries(["projectTasks", workspaceId, projectId]);
    },
  });
};
