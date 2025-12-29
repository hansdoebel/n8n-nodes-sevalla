import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForProcessesUpdate = {
  operation: ["update"],
  resource: ["processes"],
};

export const processesUpdateDescription: INodeProperties[] = [
  {
    displayName: "Process ID",
    name: "processId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForProcessesUpdate,
    },
    description: "The ID of the process to update",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForProcessesUpdate,
    },
    options: [
      {
        displayName: "Entrypoint",
        name: "entrypoint",
        type: "string",
        default: "",
        description: "Process startup command",
        placeholder: "e.g. npm start",
      },
      {
        displayName: "Instance Count",
        name: "instanceCount",
        type: "number",
        default: 1,
        description: "Number of instances to run",
        typeOptions: {
          minValue: 1,
        },
      },
      {
        displayName: "Scaling Strategy Type",
        name: "scalingStrategyType",
        type: "string",
        default: "",
        description: "Scaling strategy type (e.g., manual)",
        placeholder: "e.g. manual",
      },
    ],
  },
];

export async function processesUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const processId = this.getNodeParameter("processId", 0) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  const body: IDataObject = {};

  if (additionalFields.scalingStrategyType) {
    body.scaling_strategy = {
      type: additionalFields.scalingStrategyType,
      config: {
        instanceCount: additionalFields.instanceCount || 1,
      },
    };
  }

  if (additionalFields.entrypoint) {
    body.entrypoint = additionalFields.entrypoint;
  }

  const response = await sevallaRequest.call(this, {
    method: "PUT",
    url: API_ENDPOINTS.PROCESSES_UPDATE(processId),
    body,
  });

  const process = response?.process || response;

  return this.helpers.returnJsonArray(
    Array.isArray(process) ? process : [process],
  );
}

export default processesUpdateDescription;
