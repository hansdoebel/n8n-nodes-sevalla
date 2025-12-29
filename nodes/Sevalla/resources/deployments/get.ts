import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForDeploymentsGet = {
  operation: ["get"],
  resource: ["deployments"],
};

export const deploymentsGetDescription: INodeProperties[] = [
  {
    displayName: "Deployment ID",
    name: "deploymentId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDeploymentsGet,
    },
    description: "The ID of the deployment to retrieve",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
];

export async function deploymentsGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const deploymentId = this.getNodeParameter("deploymentId", 0) as string;

  const response = await sevallaRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.DEPLOYMENTS_GET(deploymentId),
  });

  const deployment = response?.deployment || response;

  return this.helpers.returnJsonArray(
    Array.isArray(deployment) ? deployment : [deployment],
  );
}

export default deploymentsGetDescription;
