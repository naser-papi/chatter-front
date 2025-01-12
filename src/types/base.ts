export type IParams = {
  [key: string]: string | number;
};
export interface IAPIInfo {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  tokenLess?: boolean;
  params?: IParams;
  query?: IParams;
  options?: RequestInit;
}
export interface IAPIResponse<T> {
  status: number;
  data?: T;
  error?: string;
  isOk: boolean;
}

export interface IAPIError {
  message: string | string[];
  statusCode: number;
}

export type ErrorType = IAPIError[] | IAPIError | null;
