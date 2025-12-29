import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForDatabasesGet = {
  operation: ["get"],
  resource: ["databases"],
};

export const databasesGetDescription: INodeProperties[] = [
  {
    displayName: "Database ID",
    name: "databaseId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDatabasesGet,
    },
    description: "The ID of the database to retrieve",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Internal",
    name: "internal",
    type: "boolean",
    default: true,
    displayOptions: {
      show: showForDatabasesGet,
    },
    description: "Whether to include internal connection information",
  },
  {
    displayName: "External",
    name: "external",
    type: "boolean",
    default: true,
    displayOptions: {
      show: showForDatabasesGet,
    },
    description: "Whether to include external connection information",
  },
];

export async function databasesGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const databaseId = this.getNodeParameter("databaseId", 0) as string;
  const internal = this.getNodeParameter("internal", 0) as boolean;
  const external = this.getNodeParameter("external", 0) as boolean;

  const qs: IDataObject = {
    internal,
    external,
  };

  const response = await sevallaRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.DATABASES_GET(databaseId),
    qs,
  });

  const database = response?.database || response;

  return this.helpers.returnJsonArray(
    Array.isArray(database) ? database : [database],
  );
}

export default databasesGetDescription;
