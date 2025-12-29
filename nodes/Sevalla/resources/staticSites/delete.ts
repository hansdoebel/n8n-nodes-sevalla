import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForStaticSitesDelete = {
  operation: ["delete"],
  resource: ["staticSites"],
};

export const staticSitesDeleteDescription: INodeProperties[] = [
  {
    displayName: "Static Site ID",
    name: "staticSiteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForStaticSitesDelete,
    },
    description: "The ID of the static site to delete",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
];

export async function staticSitesDelete(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const staticSiteId = this.getNodeParameter("staticSiteId", 0) as string;

  const response = await sevallaRequest.call(this, {
    method: "DELETE",
    url: API_ENDPOINTS.STATIC_SITES_DELETE(staticSiteId),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default staticSitesDeleteDescription;
