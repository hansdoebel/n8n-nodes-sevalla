import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForApplicationsDelete = {
  operation: ["delete"],
  resource: ["applications"],
};

export const applicationsDeleteDescription: INodeProperties[] = [
  {
    displayName: "Application ID",
    name: "applicationId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForApplicationsDelete,
    },
    description: "The ID of the application to delete",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
];

export async function applicationsDelete(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const applicationId = this.getNodeParameter("applicationId", 0) as string;

  const response = await sevallaRequest.call(this, {
    method: "DELETE",
    url: API_ENDPOINTS.APPLICATIONS_DELETE(applicationId),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default applicationsDeleteDescription;
