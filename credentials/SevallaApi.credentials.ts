import type {
  IAuthenticateGeneric,
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../nodes/Sevalla/utils/constants";

export class SevallaApi implements ICredentialType {
  name = "sevallaApi";

  displayName = "Sevalla API";

  documentationUrl = "https://api-docs.sevalla.com/";

  icon: Icon = "file:../icons/sevalla.svg";

  properties: INodeProperties[] = [
    {
      displayName: "Access Token",
      name: "accessToken",
      type: "string",
      typeOptions: { password: true },
      required: true,
      default: "",
    },
    {
      displayName: "Company ID",
      name: "companyId",
      type: "string",
      required: true,
      default: "",
      description: "Your Sevalla company ID",
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        Authorization: "=Bearer {{$credentials.accessToken}}",
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: API_ENDPOINTS.BASE_URL,
      url: "/applications",
      qs: {
        company: "={{$credentials.companyId}}",
      },
    },
  };
}
