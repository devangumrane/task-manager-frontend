import { useQuery } from "@tanstack/react-query";
import { getActivity } from "../services/activityService";

export const useActivityFeed = (workspaceId) => {
  return useQuery({
    queryKey: ["workspaceActivity", workspaceId],
    queryFn: () => getActivity(workspaceId),
    enabled: !!workspaceId,
  });
};
