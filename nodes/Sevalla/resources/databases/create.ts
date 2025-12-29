import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForDatabasesCreate = {
  operation: ["create"],
  resource: ["databases"],
};

export const databasesCreateDescription: INodeProperties[] = [
  {
    displayName: "Company ID",
    name: "companyId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDatabasesCreate,
    },
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Location",
    name: "location",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDatabasesCreate,
    },
    description: "Data center location (e.g., us-central1)",
    placeholder: "e.g. us-central1",
  },
  {
    displayName: "Resource Type",
    name: "resourceType",
    type: "options",
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
    default: "db1",
    required: true,
    displayOptions: {
      show: showForDatabasesCreate,
    },
    description: "Database size/tier",
  },
  {
    displayName: "Type",
    name: "type",
    type: "options",
    options: [
      { name: "PostgreSQL", value: "postgres" },
      { name: "MySQL", value: "mysql" },
      { name: "MariaDB", value: "mariadb" },
      { name: "Redis", value: "redis" },
    ],
    default: "postgres",
    required: true,
    displayOptions: {
      show: showForDatabasesCreate,
    },
    description: "Database type",
  },
  {
    displayName: "Version",
    name: "version",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDatabasesCreate,
    },
    description: "Database version",
    placeholder: "e.g. 14",
  },
  {
    displayName: "Database Name",
    name: "dbName",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForDatabasesCreate,
    },
    placeholder: "e.g. myapp_db",
  },
  {
    displayName: "Database Password",
    name: "dbPassword",
    type: "string",
    typeOptions: {
      password: true,
    },
    default: "",
    required: true,
    displayOptions: {
      show: showForDatabasesCreate,
    },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForDatabasesCreate,
    },
    options: [
      {
        displayName: "Database User",
        name: "dbUser",
        type: "string",
        default: "",
        description: "Database user (required except for Redis)",
        placeholder: "e.g. admin",
      },
      {
        displayName: "Display Name",
        name: "displayName",
        type: "string",
        default: "",
        description: "User-friendly database name",
        placeholder: "e.g. My App Database",
      },
    ],
  },
];

export async function databasesCreate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const companyId = this.getNodeParameter("companyId", 0) as string;
  const location = this.getNodeParameter("location", 0) as string;
  const resourceType = this.getNodeParameter("resourceType", 0) as string;
  const type = this.getNodeParameter("type", 0) as string;
  const version = this.getNodeParameter("version", 0) as string;
  const dbName = this.getNodeParameter("dbName", 0) as string;
  const dbPassword = this.getNodeParameter("dbPassword", 0) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  const body: IDataObject = {
    company_id: companyId,
    location,
    resource_type: resourceType,
    type,
    version,
    db_name: dbName,
    db_password: dbPassword,
  };

  if (additionalFields.dbUser) {
    body.db_user = additionalFields.dbUser;
  }

  if (additionalFields.displayName) {
    body.display_name = additionalFields.displayName;
  }

  const response = await sevallaRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.DATABASES_CREATE,
    body,
  });

  const database = response?.database || response;

  return this.helpers.returnJsonArray(
    Array.isArray(database) ? database : [database],
  );
}

export default databasesCreateDescription;
