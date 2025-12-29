import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForNetworkingClearCache = {
  operation: ["clearCache"],
  resource: ["networking"],
};

export const networkingClearCacheDescription: INodeProperties[] = [
  {
    displayName: "Application ID",
    name: "applicationId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForNetworkingClearCache,
    },
    description: "The ID of the application",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
];

export async function networkingClearCache(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const applicationId = this.getNodeParameter("applicationId", 0) as string;

  const response = await sevallaRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.NETWORKING_CLEAR_CACHE(applicationId),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default networkingClearCacheDescription;
