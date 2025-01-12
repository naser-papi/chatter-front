import { ErrorType, IAPIInfo, IAPIResponse } from "../types/base.ts";
import { ApolloError } from "@apollo/client";

export function getErrorListFromAPIError(error: ErrorType) {
  if (!error) return [];
  const isArray = Array.isArray(error);
  const list = isArray ? error.map((err) => err.message) : [error.message];
  return list.flat();
}

export function getApolloErrorStatusCode(gqlError: ApolloError): number | null {
  if (gqlError.networkError && "statusCode" in gqlError.networkError) {
    const networkErrorStatus = (gqlError.networkError as any).statusCode;
    return networkErrorStatus as number;
  }
  if (gqlError.graphQLErrors && gqlError.graphQLErrors.length > 0) {
    const error = gqlError.graphQLErrors[0];
    const { originalError } = error.extensions as {
      originalError: { statusCode: number; message: string };
    };
    return originalError?.statusCode || null;
  }
  return null;
}
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
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: info.tokenLess || !token ? "" : `Bearer ${token}`,
    },
    body: info.method !== "GET" ? JSON.stringify(info.body) : null,
  } as RequestInit;
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
