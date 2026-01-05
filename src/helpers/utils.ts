import { ErrorType, IAPIInfo, IAPIResponse, IParams } from "@/types/base";
import { ApolloError, ReactiveVar } from "@apollo/client";

export function formatMessageDateTime(fullDate?: Date | string): string {
  let date: Date | null = null;
  if (typeof fullDate === "string") {
    date = new Date(fullDate);
  }
  if (!date) return "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${month} ${day} ${year} - ${hours}:${minutes}`;
}

export function debounce(func: Function, wait: number) {
  let timeout: number;
  return function () {
    //@ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(context, args), wait);
  };
}

/**
 * Generic function to partially update an Apollo reactive variable.
 *
 * @param reactiveVar - The Apollo reactive variable created with `makeVar`.
 * @param updates - A partial update for the reactive variable.
 */
export function updateReactiveVar<T>(
  reactiveVar: ReactiveVar<T>,
  updates: Partial<T>,
): void {
  // Merge the current state of the reactive variable with the updates
  reactiveVar({
    ...reactiveVar(), // Spread the current state
    ...updates, // Apply the updates
  });
}

export function replaceParams(urlTemplate: string, params: IParams): string {
  // Regular expression to match placeholder patterns like {param1}, {param2}, etc.
  const regex = /{([^}]+)}/g;

  // Replace each placeholder in the URL template with the corresponding value from the params object
  return urlTemplate.replace(regex, (match, paramName) => {
    // Check if the paramName exists in the params object
    if (Object.prototype.hasOwnProperty.call(params, paramName)) {
      // If the paramName exists, replace the placeholder with its corresponding value
      return params[paramName].toString();
    } else {
      // If paramName doesn't exist in params, return the original placeholder
      return match;
    }
  });
}

export function addQueryParamsToUrl(url: string, queryParams: IParams): string {
  const urlObject = new URL(url, "http://example.com"); // Base URL for parsing

  for (const [key, value] of Object.entries(queryParams)) {
    urlObject.searchParams.append(key, value.toString());
  }
  console.log("urlObject", urlObject);
  // Remove the base and return the constructed URL without the leading slash
  return urlObject.pathname.slice(1) + urlObject.search;
}

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
  let normalizeUrl = info.params
    ? replaceParams(info.url, info.params)
    : info.url;
  normalizeUrl = info.query
    ? addQueryParamsToUrl(normalizeUrl, info.query)
    : normalizeUrl;

  const fullURL = import.meta.env.VITE_REST_API_SERVER + "/" + normalizeUrl;
  if (info.body instanceof FormData) {
    /*When using the fetch method with FormData, you don't need to manually set the Content-Type header to multipart/form-data. The browser automatically sets the appropriate Content-Type boundary for FormData objects. Setting it manually would override this boundary, leading to issues with the request.*/
    return await fetch(fullURL, {
      method: info.method,
      body: info.body,
      credentials: "include", // 👈 critical for cookie auth
      headers: {
        Accept: "application/json",
        Authorization: info.tokenLess || !token ? "" : `Bearer ${token}`,
      },
    });
  }

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
        status: resp.status,
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
