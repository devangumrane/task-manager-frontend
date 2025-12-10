import api from "./api";

export const getActivity = async (workspaceId) => {
  const res = await api.get(`/workspaces/${workspaceId}/activity`);
  return res.data;
};
