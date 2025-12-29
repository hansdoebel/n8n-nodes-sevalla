export const API_ENDPOINTS = {
  BASE_URL: "https://api.sevalla.com/v2",
  APPLICATIONS_GET_ALL: "/applications",
  APPLICATIONS_GET: (id: string) => `/applications/${id}`,
  APPLICATIONS_UPDATE: (id: string) => `/applications/${id}`,
  APPLICATIONS_DELETE: (id: string) => `/applications/${id}`,
  PROCESSES_GET: (processId: string) => `/applications/processes/${processId}`,
  PROCESSES_UPDATE: (id: string) => `/applications/processes/${id}`,
  DEPLOYMENTS_GET: (deploymentId: string) =>
    `/applications/deployments/${deploymentId}`,
  DEPLOYMENTS_CREATE: "/applications/deployments",
  NETWORKING_CREATE_INTERNAL_CONNECTION: (id: string) =>
    `/applications/${id}/internal-connections`,
  NETWORKING_TOGGLE_CDN: (id: string) =>
    `/applications/${id}/cdn/toggle-status`,
  NETWORKING_TOGGLE_EDGE_CACHE: (id: string) =>
    `/applications/${id}/edge-cache/toggle-status`,
  NETWORKING_CLEAR_CACHE: (id: string) => `/applications/${id}/clear-cache`,
  PIPELINES_GET_ALL: "/pipelines",
  PIPELINES_CREATE_PREVIEW_APP: (id: string) =>
    `/pipelines/${id}/create-preview-app`,
  APPLICATIONS_PROMOTE: "/applications/promote",
  DATABASES_GET_ALL: "/databases",
  DATABASES_GET: (id: string) => `/databases/${id}`,
  DATABASES_CREATE: "/databases",
  DATABASES_UPDATE: (id: string) => `/databases/${id}`,
  DATABASES_DELETE: (id: string) => `/databases/${id}`,
  STATIC_SITES_GET_ALL: "/static-sites",
  STATIC_SITES_GET: (id: string) => `/static-sites/${id}`,
  STATIC_SITES_UPDATE: (id: string) => `/static-sites/${id}`,
  STATIC_SITES_DELETE: (id: string) => `/static-sites/${id}`,
  STATIC_SITES_DEPLOYMENTS_GET: (deploymentId: string) =>
    `/static-sites/deployments/${deploymentId}`,
  STATIC_SITES_DEPLOYMENTS_CREATE: "/static-sites/deployments",
};
