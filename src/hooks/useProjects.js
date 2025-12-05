import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

export const useProjects = (workspaceId) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const res = await api.get(`/workspaces/${workspaceId}/projects`);
      return res.data.data;
    },
  });
};

export const useCreateProject = (workspaceId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) =>
      api.post(`/workspaces/${workspaceId}/projects`, data),
    onSuccess: () => {
      toast.success("Project created!");
      queryClient.invalidateQueries(["projects", workspaceId]);
    },
    onError: () => toast.error("Failed to create project"),
  });
};
