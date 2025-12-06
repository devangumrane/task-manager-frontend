import api from "./api";

export const getProjectById = async (workspaceId, projectId) => {
  const res = await api.get(
    `/workspaces/${workspaceId}/projects/${projectId}`
  );
  return res.data;
};

export const getTasksByProject = async (workspaceId, projectId) => {
  const res = await api.get(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks`
  );
  return res.data;
};
