import api from "./api";

export const getTaskById = async (workspaceId, projectId, taskId) => {
  const res = await api.get(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
  );
  return res.data;
};

export const getTaskAttachments = async (workspaceId, projectId, taskId) => {
  const res = await api.get(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/attachments`
  );
  return res.data;
};
