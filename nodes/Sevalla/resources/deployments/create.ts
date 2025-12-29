import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForDeploymentsCreate = {
  operation: ["create"],
  resource: ["deployments"],
};

export const deploymentsCreateDescription: INodeProperties[] = [
  {
    displayName: "App ID",
    name: "appId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDeploymentsCreate,
    },
    description: "The application ID to deploy",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForDeploymentsCreate,
    },
    options: [
      {
        displayName: "Branch",
        name: "branch",
        type: "string",
        default: "",
        description: "Git branch to deploy from",
        placeholder: "e.g. main",
      },
      {
        displayName: "Docker Image",
        name: "dockerImage",
        type: "string",
        default: "",
        description: "Docker image to deploy",
        placeholder: "e.g. myregistry/myapp:latest",
      },
      {
        displayName: "Is Restart",
        name: "isRestart",
        type: "boolean",
        default: false,
        description: "Whether to release without building the app",
      },
    ],
  },
];

export async function deploymentsCreate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const appId = this.getNodeParameter("appId", 0) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  const body: IDataObject = {
    app_id: appId,
  };

  if (additionalFields.branch) {
    body.branch = additionalFields.branch;
  }

  if (additionalFields.dockerImage) {
    body.docker_image = additionalFields.dockerImage;
  }

  if (
    additionalFields.isRestart !== undefined &&
    additionalFields.isRestart !== null
  ) {
    body.is_restart = additionalFields.isRestart;
  }

  const response = await sevallaRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.DEPLOYMENTS_CREATE,
    body,
  });

  const deployment = response?.deployment || response;

  return this.helpers.returnJsonArray(
    Array.isArray(deployment) ? deployment : [deployment],
  );
}

export default deploymentsCreateDescription;
