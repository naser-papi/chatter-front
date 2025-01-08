import { IAPIInfo } from "../types/base.ts";
import { mainAPICall } from "../helpers/utils.ts";
import useAlert from "@/hooks/use-alert.tsx";

const useCallApi = () => {
  const callRestAPI = async <T>(info: IAPIInfo): Promise<T | undefined> => {
    const { showAlert } = useAlert();
    const resp = await mainAPICall<T>(info);
    if (resp.isOk) {
      return resp.data;
    } else {
      showAlert(resp.error!);
    }
  };

  return { callRestAPI };
};

export default useCallApi;
