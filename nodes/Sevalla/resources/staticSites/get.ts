import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForStaticSitesGet = {
  operation: ["get"],
  resource: ["staticSites"],
};

export const staticSitesGetDescription: INodeProperties[] = [
  {
    displayName: "Static Site ID",
    name: "staticSiteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForStaticSitesGet,
    },
    description: "The ID of the static site to retrieve",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
];

export async function staticSitesGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const staticSiteId = this.getNodeParameter("staticSiteId", 0) as string;

  const response = await sevallaRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.STATIC_SITES_GET(staticSiteId),
  });

  const staticSite = response?.static_site || response;

  return this.helpers.returnJsonArray(
    Array.isArray(staticSite) ? staticSite : [staticSite],
  );
}

export default staticSitesGetDescription;
