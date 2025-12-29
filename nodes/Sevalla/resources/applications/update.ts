import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForApplicationsUpdate = {
  operation: ["update"],
  resource: ["applications"],
};

export const applicationsUpdateDescription: INodeProperties[] = [
  {
    displayName: "Application ID",
    name: "applicationId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForApplicationsUpdate,
    },
    description: "The ID of the application to update",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForApplicationsUpdate,
    },
    options: [
      {
        displayName: "Auto Deploy",
        name: "autoDeploy",
        type: "boolean",
        default: false,
        description: "Whether to automatically deploy on push",
      },
      {
        displayName: "Build Path",
        name: "buildPath",
        type: "string",
        default: "",
        description: "Path to build output (e.g., dist)",
        placeholder: "e.g. dist",
      },
      {
        displayName: "Build Type",
        name: "buildType",
        type: "options",
        default: "dockerfile",
        options: [
          {
            name: "Dockerfile",
            value: "dockerfile",
          },
          {
            name: "Pack",
            value: "pack",
          },
          {
            name: "Nixpacks",
            value: "nixpacks",
          },
        ],
        description: "Build type for the application",
      },
      {
        displayName: "Default Branch",
        name: "defaultBranch",
        type: "string",
        default: "",
        description: "Default branch for deployment",
        placeholder: "e.g. main",
      },
      {
        displayName: "Display Name",
        name: "displayName",
        type: "string",
        default: "",
        description: "User-friendly name for the application",
        placeholder: "e.g. My App",
      },
      {
        displayName: "Docker Context",
        name: "dockerContext",
        type: "string",
        default: "",
        description: "Docker build context (e.g., .)",
        placeholder: "e.g. .",
      },
      {
        displayName: "Docker File Path",
        name: "dockerFilePath",
        type: "string",
        default: "",
        description: "Path to Dockerfile",
        placeholder: "e.g. Dockerfile",
      },
      {
        displayName: "Hibernate After Seconds",
        name: "hibernateAfterSeconds",
        type: "number",
        default: 0,
        description: "Seconds before hibernation activates",
        typeOptions: {
          minValue: 0,
        },
      },
      {
        displayName: "Hibernation Enabled",
        name: "hibernationEnabled",
        type: "boolean",
        default: false,
        description: "Whether hibernation is enabled",
      },
    ],
  },
];

export async function applicationsUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const applicationId = this.getNodeParameter("applicationId", 0) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  const body: IDataObject = {};

  if (additionalFields.displayName) {
    body.display_name = additionalFields.displayName;
  }

  if (
    additionalFields.autoDeploy !== undefined &&
    additionalFields.autoDeploy !== null
  ) {
    body.auto_deploy = additionalFields.autoDeploy;
  }

  if (additionalFields.buildPath) {
    body.build_path = additionalFields.buildPath;
  }

  if (additionalFields.buildType) {
    body.build_type = additionalFields.buildType;
  }

  if (additionalFields.defaultBranch) {
    body.default_branch = additionalFields.defaultBranch;
  }

  if (additionalFields.dockerContext) {
    body.docker_context = additionalFields.dockerContext;
  }

  if (additionalFields.dockerFilePath) {
    body.docker_file_path = additionalFields.dockerFilePath;
  }

  if (
    additionalFields.hibernationEnabled !== undefined &&
    additionalFields.hibernationEnabled !== null
  ) {
    body.hibernation_enabled = additionalFields.hibernationEnabled;
  }

  if (
    additionalFields.hibernateAfterSeconds ||
    additionalFields.hibernateAfterSeconds === 0
  ) {
    body.hibernate_after_seconds = additionalFields.hibernateAfterSeconds;
  }

  const response = await sevallaRequest.call(this, {
    method: "PUT",
    url: API_ENDPOINTS.APPLICATIONS_UPDATE(applicationId),
    body,
  });

  const application = response?.app || response;

  return this.helpers.returnJsonArray(
    Array.isArray(application) ? application : [application],
  );
}

export default applicationsUpdateDescription;
