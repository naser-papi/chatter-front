import { IAPIInfo, IAPIResponse } from "../types/base.ts";
import { ApolloError } from "@apollo/client";

export function getApolloErrorList(error: ApolloError): string[] | string {
  if (error.networkError) {
    return [error.networkError.message];
  }
  if (error.graphQLErrors) {
    return error.graphQLErrors.flatMap(
      (err: {
        message: string;
        extensions?: { originalError?: { message: string[] } };
      }) => {
        if (err.extensions?.originalError?.message) {
          return err.extensions.originalError.message;
        }
        return err.message;
      },
    );
  }
  return [];
}
export async function coreAPICall(info: IAPIInfo, token = "") {
  const fullURL = import.meta.env.VITE_REST_API_SERVER + "/" + info.url;
  const options = {
    method: info.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: info.tokenLess || !token ? "" : `Bearer ${token}`,
    },
    body: info.method !== "GET" ? JSON.stringify(info.body) : null,
  };
  return await fetch(fullURL, options);
}

export async function mainAPICall<T>(
  info: IAPIInfo,
  token = "",
): Promise<IAPIResponse<T>> {
  try {
    const resp = await coreAPICall(info, token);
    if (resp.status === 200 || resp.status === 201 || resp.status === 303) {
      const res = await resp.json();
      return { data: res as T, status: resp.status, isOk: true };
    }
    if (resp.status === 204) {
      return { status: resp.status, data: {} as T, isOk: true };
    } else {
      const res = await resp.json();
      if (res.status === 500) {
        alert("Server Side Error!");
      }
      return {
        status: res.status,
        error:
          (res.message as string) ||
          (res.error as string) ||
          "Something went wrong",
        isOk: false,
      };
    }
  } catch (error) {
    console.log("error!", error);
    return {
      status: 500,
      error: `SOMETHING WENT WRONG! ${error}`,
      isOk: false,
    };
  }
}
