import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

// Fetch all workspaces
export const useWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await api.get("/workspaces");
      return res.data.data;
    },
  });
};

// Create workspace
export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/workspaces", data);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Workspace created!");
      queryClient.invalidateQueries(["workspaces"]);
    },
    onError: () => toast.error("Failed to create workspace"),
  });
};
