import {
  type IExecuteFunctions,
  type INodeExecutionData,
  type INodeType,
  type INodeTypeDescription,
  NodeConnectionTypes,
  NodeOperationError,
} from "n8n-workflow";
import { API_ENDPOINTS } from "./utils/constants";
import {
  applicationsDelete,
  applicationsDeleteDescription,
  applicationsGet,
  applicationsGetAll,
  applicationsGetAllDescription,
  applicationsGetDescription,
  applicationsUpdate,
  applicationsUpdateDescription,
} from "./resources/applications";
import {
  deploymentsCreate,
  deploymentsCreateDescription,
  deploymentsGet,
  deploymentsGetDescription,
} from "./resources/deployments";
import {
  networkingClearCache,
  networkingClearCacheDescription,
  networkingCreateInternalConnection,
  networkingCreateInternalConnectionDescription,
  networkingToggleCdn,
  networkingToggleCdnDescription,
  networkingToggleEdgeCache,
  networkingToggleEdgeCacheDescription,
} from "./resources/networking";
import {
  processesGet,
  processesGetDescription,
  processesUpdate,
  processesUpdateDescription,
} from "./resources/processes";
import {
  pipelinesCreatePreviewApp,
  pipelinesCreatePreviewAppDescription,
  pipelinesGetAll,
  pipelinesGetAllDescription,
} from "./resources/pipelines";
import {
  databasesCreate,
  databasesCreateDescription,
  databasesDelete,
  databasesDeleteDescription,
  databasesGet,
  databasesGetAll,
  databasesGetAllDescription,
  databasesGetDescription,
  databasesUpdate,
  databasesUpdateDescription,
} from "./resources/databases";
import {
  staticSitesDelete,
  staticSitesDeleteDescription,
  staticSitesDeploymentsCreate,
  staticSitesDeploymentsCreateDescription,
  staticSitesDeploymentsGet,
  staticSitesDeploymentsGetDescription,
  staticSitesGet,
  staticSitesGetAll,
  staticSitesGetAllDescription,
  staticSitesGetDescription,
  staticSitesUpdate,
  staticSitesUpdateDescription,
} from "./resources/staticSites";

export class Sevalla implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Sevalla",
    name: "sevalla",
    icon: "file:../../icons/sevalla.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Interact with the Sevalla API",
    defaults: {
      name: "Sevalla",
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [{ name: "sevallaApi", required: true }],
    requestDefaults: {
      baseURL: API_ENDPOINTS.BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Application",
            value: "applications",
          },
          {
            name: "Database",
            value: "databases",
          },
          {
            name: "Deployment",
            value: "deployments",
          },
          {
            name: "Networking",
            value: "networking",
          },
          {
            name: "Pipeline",
            value: "pipelines",
          },
          {
            name: "Process",
            value: "processes",
          },
          {
            name: "Static Site",
            value: "staticSites",
          },
        ],
        default: "applications",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["applications"],
          },
        },
        options: [
          {
            name: "Delete",
            value: "delete",
            action: "Delete an applications",
          },
          {
            name: "Get",
            value: "get",
            action: "Get an applications",
          },
          {
            name: "Get Many",
            value: "getAll",
            action: "Get many applications",
          },
          {
            name: "Update",
            value: "update",
            action: "Update an applications",
          },
        ],
        default: "getAll",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["deployments"],
          },
        },
        options: [
          {
            name: "Create",
            value: "create",
            action: "Create a deployments",
          },
          {
            name: "Get",
            value: "get",
            action: "Get a deployments",
          },
        ],
        default: "get",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["networking"],
          },
        },
        options: [
          {
            name: "Clear Cache",
            value: "clearCache",
            action: "Clear cache a networking",
          },
          {
            name: "Create Internal Connection",
            value: "createInternalConnection",
            action: "Create internal connection a networking",
          },
          {
            name: "Toggle CDN",
            value: "toggleCdn",
            action: "Toggle CDN a networking",
          },
          {
            name: "Toggle Edge Cache",
            value: "toggleEdgeCache",
            action: "Toggle edge cache a networking",
          },
        ],
        default: "createInternalConnection",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["processes"],
          },
        },
        options: [
          {
            name: "Get",
            value: "get",
            action: "Get a processes",
          },
          {
            name: "Update",
            value: "update",
            action: "Update a processes",
          },
        ],
        default: "get",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["pipelines"],
          },
        },
        options: [
          {
            name: "Create Preview App",
            value: "createPreviewApp",
            action: "Create preview app a pipelines",
          },
          {
            name: "Get Many",
            value: "getAll",
            action: "Get many pipelines",
          },
        ],
        default: "getAll",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["databases"],
          },
        },
        options: [
          {
            name: "Create",
            value: "create",
            action: "Create a databases",
          },
          {
            name: "Delete",
            value: "delete",
            action: "Delete a databases",
          },
          {
            name: "Get",
            value: "get",
            action: "Get a databases",
          },
          {
            name: "Get Many",
            value: "getAll",
            action: "Get many databases",
          },
          {
            name: "Update",
            value: "update",
            action: "Update a databases",
          },
        ],
        default: "getAll",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["staticSites"],
          },
        },
        options: [
          {
            name: "Delete",
            value: "delete",
            action: "Delete a static sites",
          },
          {
            name: "Deployments Create",
            value: "deploymentsCreate",
            action: "Deployments create a static sites",
          },
          {
            name: "Deployments Get",
            value: "deploymentsGet",
            action: "Deployments get a static sites",
          },
          {
            name: "Get",
            value: "get",
            action: "Get a static sites",
          },
          {
            name: "Get Many",
            value: "getAll",
            action: "Get many static sites",
          },
          {
            name: "Update",
            value: "update",
            action: "Update a static sites",
          },
        ],
        default: "getAll",
      },
      ...applicationsDeleteDescription,
      ...applicationsGetDescription,
      ...applicationsGetAllDescription,
      ...applicationsUpdateDescription,
      ...deploymentsCreateDescription,
      ...deploymentsGetDescription,
      ...networkingClearCacheDescription,
      ...networkingCreateInternalConnectionDescription,
      ...networkingToggleCdnDescription,
      ...networkingToggleEdgeCacheDescription,
      ...processesGetDescription,
      ...processesUpdateDescription,
      ...pipelinesCreatePreviewAppDescription,
      ...pipelinesGetAllDescription,
      ...databasesCreateDescription,
      ...databasesDeleteDescription,
      ...databasesGetDescription,
      ...databasesGetAllDescription,
      ...databasesUpdateDescription,
      ...staticSitesDeleteDescription,
      ...staticSitesDeploymentsCreateDescription,
      ...staticSitesDeploymentsGetDescription,
      ...staticSitesGetDescription,
      ...staticSitesGetAllDescription,
      ...staticSitesUpdateDescription,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;

    await this.getCredentials("sevallaApi");

    const handlers: Record<
      string,
      Record<string, (this: IExecuteFunctions) => Promise<INodeExecutionData[]>>
    > = {
      applications: {
        delete: applicationsDelete,
        get: applicationsGet,
        getAll: applicationsGetAll,
        update: applicationsUpdate,
      },
      databases: {
        create: databasesCreate,
        delete: databasesDelete,
        get: databasesGet,
        getAll: databasesGetAll,
        update: databasesUpdate,
      },
      deployments: {
        create: deploymentsCreate,
        get: deploymentsGet,
      },
      networking: {
        clearCache: networkingClearCache,
        createInternalConnection: networkingCreateInternalConnection,
        toggleCdn: networkingToggleCdn,
        toggleEdgeCache: networkingToggleEdgeCache,
      },
      pipelines: {
        createPreviewApp: pipelinesCreatePreviewApp,
        getAll: pipelinesGetAll,
      },
      processes: {
        get: processesGet,
        update: processesUpdate,
      },
      staticSites: {
        delete: staticSitesDelete,
        deploymentsCreate: staticSitesDeploymentsCreate,
        deploymentsGet: staticSitesDeploymentsGet,
        get: staticSitesGet,
        getAll: staticSitesGetAll,
        update: staticSitesUpdate,
      },
    };

    try {
      const handler = handlers[resource]?.[operation];
      if (!handler) {
        throw new NodeOperationError(
          this.getNode(),
          `Unsupported operation "${operation}" for resource "${resource}"`,
        );
      }

      const res = await handler.call(this);
      return [res];
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new NodeOperationError(this.getNode(), error.message);
      }
      throw new NodeOperationError(this.getNode(), `${error}`);
    }
  }
}
