import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForNetworkingCreateInternalConnection = {
  operation: ["createInternalConnection"],
  resource: ["networking"],
};

export const networkingCreateInternalConnectionDescription: INodeProperties[] =
  [
    {
      displayName: "Application ID",
      name: "applicationId",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: showForNetworkingCreateInternalConnection,
      },
      description: "The ID of the application",
      placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
    },
    {
      displayName: "Target Type",
      name: "targetType",
      type: "options",
      options: [
        {
          name: "App Resource",
          value: "appResource",
        },
        {
          name: "DB Resource",
          value: "dbResource",
        },
        {
          name: "Env Resource",
          value: "envResource",
        },
      ],
      default: "appResource",
      required: true,
      displayOptions: {
        show: showForNetworkingCreateInternalConnection,
      },
      description: "Type of resource to connect to",
    },
    {
      displayName: "Target ID",
      name: "targetId",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: showForNetworkingCreateInternalConnection,
      },
      description: "The ID of the target resource",
      placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
    },
  ];

export async function networkingCreateInternalConnection(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const applicationId = this.getNodeParameter("applicationId", 0) as string;
  const targetType = this.getNodeParameter("targetType", 0) as string;
  const targetId = this.getNodeParameter("targetId", 0) as string;

  const body: IDataObject = {
    target_type: targetType,
    target_id: targetId,
  };

  const response = await sevallaRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.NETWORKING_CREATE_INTERNAL_CONNECTION(applicationId),
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default networkingCreateInternalConnectionDescription;
