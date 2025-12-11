export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",

  DASHBOARD: "/",
  WORKSPACES: "/workspaces",
  WORKSPACE: (id) => `/workspaces/${id}`,

  PROJECTS: "/projects",
  PROJECT: (ws, p) => `/workspaces/${ws}/projects/${p}`,

  TASK: (ws, p, t) => `/workspaces/${ws}/projects/${p}/tasks/${t}`,

  ACTIVITY: "/activity",
};
