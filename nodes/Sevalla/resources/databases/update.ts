import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForDatabasesUpdate = {
  operation: ["update"],
  resource: ["databases"],
};

export const databasesUpdateDescription: INodeProperties[] = [
  {
    displayName: "Database ID",
    name: "databaseId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDatabasesUpdate,
    },
    description: "The ID of the database to update",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForDatabasesUpdate,
    },
    options: [
      {
        displayName: "Display Name",
        name: "displayName",
        type: "string",
        default: "",
        description: "User-friendly database name",
        placeholder: "e.g. My App Database",
      },
      {
        displayName: "Resource Type",
        name: "resourceType",
        type: "options",
        default: "db1",
        options: [
          { name: "Db1", value: "db1" },
          { name: "Db2", value: "db2" },
          { name: "Db3", value: "db3" },
          { name: "Db4", value: "db4" },
          { name: "Db5", value: "db5" },
          { name: "Db6", value: "db6" },
          { name: "Db7", value: "db7" },
          { name: "Db8", value: "db8" },
          { name: "Db9", value: "db9" },
        ],
        description: "Database size/tier",
      },
    ],
  },
];

export async function databasesUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const databaseId = this.getNodeParameter("databaseId", 0) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  const body: IDataObject = {};

  if (additionalFields.displayName) {
    body.display_name = additionalFields.displayName;
  }

  if (additionalFields.resourceType) {
    body.resource_type = additionalFields.resourceType;
  }

  const response = await sevallaRequest.call(this, {
    method: "PUT",
    url: API_ENDPOINTS.DATABASES_UPDATE(databaseId),
    body,
  });

  const database = response?.database || response;

  return this.helpers.returnJsonArray(
    Array.isArray(database) ? database : [database],
  );
}

export default databasesUpdateDescription;
