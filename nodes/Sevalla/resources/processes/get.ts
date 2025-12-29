import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForProcessesGet = {
  operation: ["get"],
  resource: ["processes"],
};

export const processesGetDescription: INodeProperties[] = [
  {
    displayName: "Process ID",
    name: "processId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForProcessesGet,
    },
    description: "The ID of the process to retrieve",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
];

export async function processesGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const processId = this.getNodeParameter("processId", 0) as string;

  const response = await sevallaRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.PROCESSES_GET(processId),
  });

  const process = response?.process || response;

  return this.helpers.returnJsonArray(
    Array.isArray(process) ? process : [process],
  );
}

export default processesGetDescription;
