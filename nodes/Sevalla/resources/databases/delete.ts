import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForDatabasesDelete = {
  operation: ["delete"],
  resource: ["databases"],
};

export const databasesDeleteDescription: INodeProperties[] = [
  {
    displayName: "Database ID",
    name: "databaseId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDatabasesDelete,
    },
    description: "The ID of the database to delete",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
];

export async function databasesDelete(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const databaseId = this.getNodeParameter("databaseId", 0) as string;

  const response = await sevallaRequest.call(this, {
    method: "DELETE",
    url: API_ENDPOINTS.DATABASES_DELETE(databaseId),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default databasesDeleteDescription;
