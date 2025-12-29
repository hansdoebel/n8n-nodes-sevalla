import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForApplicationsGet = {
  operation: ["get"],
  resource: ["applications"],
};

export const applicationsGetDescription: INodeProperties[] = [
  {
    displayName: "Application ID",
    name: "applicationId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForApplicationsGet,
    },
    description: "The ID of the application to retrieve",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
];

export async function applicationsGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const applicationId = this.getNodeParameter("applicationId", 0) as string;

  const response = await sevallaRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.APPLICATIONS_GET(applicationId),
  });

  // Extract the application from the response structure
  const application = response?.app || response;

  return this.helpers.returnJsonArray(
    Array.isArray(application) ? application : [application],
  );
}

export default applicationsGetDescription;
