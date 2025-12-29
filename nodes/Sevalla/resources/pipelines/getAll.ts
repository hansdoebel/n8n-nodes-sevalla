import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForPipelinesGetAll = {
  operation: ["getAll"],
  resource: ["pipelines"],
};

export const pipelinesGetAllDescription: INodeProperties[] = [
  {
    displayName: "Company ID",
    name: "companyId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForPipelinesGetAll,
    },
    description: "The company ID to retrieve pipelines for",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: true,
    displayOptions: {
      show: showForPipelinesGetAll,
    },
    description: "Whether to return all results or only up to a given limit",
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["pipelines"],
        returnAll: [false],
      },
    },
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
    },
  },
  {
    displayName: "Offset",
    name: "offset",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["pipelines"],
        returnAll: [false],
      },
    },
    description: "Pagination offset",
    typeOptions: {
      minValue: 0,
    },
  },
];

export async function pipelinesGetAll(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const returnAll = this.getNodeParameter("returnAll", 0) as boolean;
  const companyId = this.getNodeParameter("companyId", 0) as string;

  const qs: IDataObject = {
    company: companyId,
  };

  if (!returnAll) {
    qs.limit = this.getNodeParameter("limit", 0) as number;
    qs.offset = this.getNodeParameter("offset", 0) as number;
  }

  const response = await sevallaRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.PIPELINES_GET_ALL,
    qs,
  });

  const pipelines = response?.company?.pipelines?.items || [];

  return this.helpers.returnJsonArray(
    Array.isArray(pipelines) ? pipelines : [pipelines],
  );
}

export default pipelinesGetAllDescription;
