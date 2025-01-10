import { IAPIInfo } from "../types/base.ts";
import { mainAPICall } from "../helpers/utils.ts";
import { useState } from "react";

const useCallApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[] | string>("");
  const callRestAPI = async <T>(info: IAPIInfo): Promise<T | undefined> => {
    try {
      setIsLoading(true);
      setError("");
      const resp = await mainAPICall<T>(info);
      if (resp.isOk) {
        return resp.data;
      } else {
        setError(resp.error!);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return [callRestAPI, isLoading, error] as [
    typeof callRestAPI,
    boolean,
    string,
  ];
};

export default useCallApi;
