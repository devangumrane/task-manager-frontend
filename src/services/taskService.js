import api from "./api";

export const getTaskById = async (workspaceId, projectId, taskId) => {
  const res = await api.get(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
  );
  return res.data.data; // <-- extract actual task
};

export const getTaskAttachments = async (workspaceId, projectId, taskId) => {
  const res = await api.get(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/attachments`
  );
  return res.data.data ?? []; // ensure array
};

export const createTask = async (workspaceId, projectId, payload) => {
  const res = await api.post(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    payload
  );
  return res.data;
};
