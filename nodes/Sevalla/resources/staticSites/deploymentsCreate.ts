import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForStaticSitesDeploymentsCreate = {
  operation: ["deploymentsCreate"],
  resource: ["staticSites"],
};

export const staticSitesDeploymentsCreateDescription: INodeProperties[] = [
  {
    displayName: "Static Site ID",
    name: "staticSiteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForStaticSitesDeploymentsCreate,
    },
    description: "The ID of the static site to deploy",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Branch",
    name: "branch",
    type: "string",
    default: "",
    displayOptions: {
      show: showForStaticSitesDeploymentsCreate,
    },
    description: "Git branch to deploy from",
    placeholder: "e.g. main",
  },
];

export async function staticSitesDeploymentsCreate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const staticSiteId = this.getNodeParameter("staticSiteId", 0) as string;

  const body: IDataObject = {
    static_site_id: staticSiteId,
  };

  const branch = this.getNodeParameter("branch", 0) as string;
  if (branch) {
    body.branch = branch;
  }

  const response = await sevallaRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.STATIC_SITES_DEPLOYMENTS_CREATE,
    body,
  });

  const deployment = response?.deployment || response;

  return this.helpers.returnJsonArray(
    Array.isArray(deployment) ? deployment : [deployment],
  );
}

export default staticSitesDeploymentsCreateDescription;
