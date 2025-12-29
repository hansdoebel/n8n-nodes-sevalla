import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { sevallaRequest } from "../../utils/helpers";

const showForPipelinesCreatePreviewApp = {
  operation: ["createPreviewApp"],
  resource: ["pipelines"],
};

export const pipelinesCreatePreviewAppDescription: INodeProperties[] = [
  {
    displayName: "Pipeline ID",
    name: "pipelineId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForPipelinesCreatePreviewApp,
    },
    description: "The ID of the pipeline",
    placeholder: "e.g. 54fb80af-576c-4fdc-ba4f-b596c83f15a1",
  },
  {
    displayName: "Branch",
    name: "branch",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: showForPipelinesCreatePreviewApp,
    },
    description: "Git branch to create preview app from",
    placeholder: "e.g. main",
  },
  {
    displayName: "Pull Request Number",
    name: "pullRequestNumber",
    type: "number",
    default: 0,
    displayOptions: {
      show: showForPipelinesCreatePreviewApp,
    },
    description: "Pull request number (optional)",
  },
];

export async function pipelinesCreatePreviewApp(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const pipelineId = this.getNodeParameter("pipelineId", 0) as string;
  const branch = this.getNodeParameter("branch", 0) as string;

  const body: IDataObject = {
    branch,
  };

  const pullRequestNumber = this.getNodeParameter(
    "pullRequestNumber",
    0,
  ) as number;
  if (pullRequestNumber && pullRequestNumber > 0) {
    body.pull_request_number = pullRequestNumber;
  }

  const response = await sevallaRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.PIPELINES_CREATE_PREVIEW_APP(pipelineId),
    body,
  });

  const app = response?.app || response;

  return this.helpers.returnJsonArray(
    Array.isArray(app) ? app : [app],
  );
}

export default pipelinesCreatePreviewAppDescription;
