import { type IExecuteFunctions, type IHttpRequestOptions } from "n8n-workflow";
import { API_ENDPOINTS } from "./constants";

export async function sevallaRequest(
  this: IExecuteFunctions,
  options: Partial<IHttpRequestOptions> = {},
) {
  const credentials = await this.getCredentials("sevallaApi");
  const accessToken = credentials?.accessToken as string;

  if (!accessToken) {
    throw new Error("sevallaApi accessToken is required");
  }

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
    Authorization: `Bearer ${accessToken}`,
  };

  const opts: IHttpRequestOptions = {
    baseURL: API_ENDPOINTS.BASE_URL,
    ...options,
    headers,
  } as IHttpRequestOptions;

  return this.helpers.httpRequest!(opts);
}
