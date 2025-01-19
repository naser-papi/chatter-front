import { useNavigate } from "react-router-dom";
import type { ErrorType, IAPIInfo } from "@/types/base";
import { mainAPICall } from "@/helpers/utils";
import { useState } from "react";
import useAlert from "@/hooks/use-alert.tsx";

const useCallApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const callRestAPI = async <T>(info: IAPIInfo): Promise<T | undefined> => {
    try {
      setIsLoading(true);
      setError(null);
      const resp = await mainAPICall<T>(info);
      if (resp.isOk) {
        return resp.data;
      } else {
        if (resp.status == 401) {
          navigate("/login");
        }
        if (resp.status == 403) {
          navigate("/forbidden");
        }
        if (resp.status == 500) {
          showAlert(resp.error!, "error");
        }
        setError({ statusCode: resp.status, message: resp.error! });
      }
    } catch (err: any) {
      setError({
        statusCode: 500,
        message: err.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return [callRestAPI, isLoading, error] as const;
};

export default useCallApi;
