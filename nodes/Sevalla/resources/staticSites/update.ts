import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForStaticSitesUpdate = {
  operation: ["update"],
  resource: ["staticSites"],
};

export const staticSitesUpdateDescription: INodeProperties[] = [
  {
    displayName: "Static Site ID",
    name: "staticSiteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForStaticSitesUpdate,
    },
    description: "The ID of the static site to update",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForStaticSitesUpdate,
    },
    options: [
      {
        displayName: "Auto Deploy",
        name: "autoDeploy",
        type: "boolean",
        default: false,
        description: "Whether to enable automatic deployments",
      },
      {
        displayName: "Build Command",
        name: "buildCommand",
        type: "string",
        default: "",
        description: "Command to build site",
        placeholder: "e.g. npm run build",
      },
      {
        displayName: "Default Branch",
        name: "defaultBranch",
        type: "string",
        default: "",
        description: "Git branch for deployments",
        placeholder: "e.g. main",
      },
      {
        displayName: "Display Name",
        name: "displayName",
        type: "string",
        default: "",
        description: "Site display name",
        placeholder: "e.g. My Static Site",
      },
      {
        displayName: "Node Version",
        name: "nodeVersion",
        type: "options",
        default: "16.20.0",
        options: [
          { name: "16.20.0", value: "16.20.0" },
          { name: "18.16.0", value: "18.16.0" },
          { name: "20.2.0", value: "20.2.0" },
        ],
        description: "Node.js version",
      },
      {
        displayName: "Published Directory",
        name: "publishedDirectory",
        type: "string",
        default: "",
        description: "Output directory (e.g., dist)",
        placeholder: "e.g. dist",
      },
    ],
  },
];

export async function staticSitesUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const staticSiteId = this.getNodeParameter("staticSiteId", 0) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  const body: IDataObject = {};

  if (
    additionalFields.autoDeploy !== undefined &&
    additionalFields.autoDeploy !== null
  ) {
    body.auto_deploy = additionalFields.autoDeploy;
  }

  if (additionalFields.buildCommand) {
    body.build_command = additionalFields.buildCommand;
  }

  if (additionalFields.defaultBranch) {
    body.default_branch = additionalFields.defaultBranch;
  }

  if (additionalFields.displayName) {
    body.display_name = additionalFields.displayName;
  }

  if (additionalFields.nodeVersion) {
    body.node_version = additionalFields.nodeVersion;
  }

  if (additionalFields.publishedDirectory) {
    body.published_directory = additionalFields.publishedDirectory;
  }

  const response = await sevallaRequest.call(this, {
    method: "PUT",
    url: API_ENDPOINTS.STATIC_SITES_UPDATE(staticSiteId),
    body,
  });

  const staticSite = response?.static_site || response;

  return this.helpers.returnJsonArray(
    Array.isArray(staticSite) ? staticSite : [staticSite],
  );
}

export default staticSitesUpdateDescription;
