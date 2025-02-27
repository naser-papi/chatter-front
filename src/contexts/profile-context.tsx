import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAlert, useCallApi } from "@/hooks";
import { getErrorListFromAPIError } from "@/helpers/utils";
import { AuthPath } from "@/constants";
import { UserDto } from "@/dto/auth";
import { useNavigate } from "react-router-dom";

interface ProfileContextProps {
  data: {
    fullName: string;
    avatarImage: File | null;
  };
  setData: Dispatch<SetStateAction<ProfileContextProps["data"]>>;
  apiLoading: boolean;
  saveData: () => void;
  onCancel: () => void;
}

export const ProfileContext = createContext<ProfileContextProps>(
  {} as ProfileContextProps,
);

const ProfileProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [callRestAPI, apiLoading, apiCallError] = useCallApi();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [data, setData] = useState<ProfileContextProps["data"]>({
    fullName: "",
    avatarImage: null,
  });

  const saveData = useCallback(async () => {
    if (!data.fullName) {
      showAlert("Please enter full name", "error");
      return;
    }
    const apiInfo = AuthPath.updateProfile;
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatarImage", data.avatarImage as Blob);
    apiInfo.body = formData;
    const resp = await callRestAPI<UserDto>(apiInfo);
    if (resp) {
      showAlert("Update profile successful", "success");
    }
  }, [data, callRestAPI]);

  const onCancel = () => {
    console.log("cancel");
    navigate("/");
  };

  useEffect(() => {
    if (apiCallError) {
      const message = getErrorListFromAPIError(apiCallError);
      showAlert(message, "error");
    }
  }, [apiCallError]);

  return (
    <ProfileContext.Provider
      value={{ data, setData, saveData, apiLoading, onCancel }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
