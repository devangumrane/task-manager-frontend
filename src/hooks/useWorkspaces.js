import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listWorkspaces,
  getWorkspace,
  createWorkspace,
} from "../services/workspaceService";

export const useWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await listWorkspaces();

      // BACKEND FORMAT:
      // { success: true, data: { workspaces: [...] } }

      if (!res || !res.data || !Array.isArray(res.data.workspaces)) {
        return []; // NEVER return undefined
      }

      return res.data.workspaces;
    },
  });
};

export const useWorkspace = (workspaceId) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspace(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
    },
  });
};
