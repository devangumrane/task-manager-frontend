import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjectById,
  getTasksByProject,
  createProject,
  listProjects,
} from "../services/projectService";

export const useProjects = (workspaceId) => {
  return useQuery({
    queryKey: ["workspaceProjects", workspaceId],
    queryFn: () => listProjects(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useProject = (workspaceId, projectId) => {
  return useQuery({
    queryKey: ["project", workspaceId, projectId],
    queryFn: () => getProjectById(workspaceId, projectId),
    enabled: !!workspaceId && !!projectId,
  });
};

export const useProjectTasks = (workspaceId, projectId) => {
  return useQuery({
    queryKey: ["projectTasks", workspaceId, projectId],
    queryFn: () => getTasksByProject(workspaceId, projectId),
    enabled: !!workspaceId && !!projectId,
  });
};

export const useCreateProject = (workspaceId) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createProject(workspaceId, payload),
    onSuccess: () => {
      qc.invalidateQueries(["workspaceProjects", workspaceId]);
      qc.invalidateQueries(["workspaces"]);
    },
  });
};
