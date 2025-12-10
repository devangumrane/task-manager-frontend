import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTaskById,
} from "../services/taskService";

export const useTask = (wsId, pId, taskId) => {
  return useQuery({
    queryKey: ["task", wsId, pId, taskId],
    queryFn: () => getTaskById(wsId, pId, taskId),
    enabled: !!wsId && !!pId && !!taskId,
  });
};
