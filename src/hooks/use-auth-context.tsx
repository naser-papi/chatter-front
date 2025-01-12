import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallApi, useCallMutation } from "@/hooks";
import { apolloClient, AuthPath } from "@/constants";
import useAlert from "@/hooks/use-alert";
import { CreateUserDto } from "@/dto/auth";
import { CREATE_USER } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";

interface AuthContextProps {
  mode: "login" | "register";
  data: {
    name?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
  };
  setData: Dispatch<SetStateAction<AuthContextProps["data"]>>;
  doLogin: () => void;
  doRegister: () => void;
  apiLoading: boolean;
  apiError: string[] | null;
}
const AuthContext = createContext({} as AuthContextProps);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [mode, setMode] = useState<AuthContextProps["mode"]>("login");
  const [data, setData] = useState<AuthContextProps["data"]>({});
  const [callRestAPi, apiLoading, apiCallError] = useCallApi();
  const [registerUser, _, createUserError, createUserLoading] = useCallMutation<
    CreateUserDto,
    { data: CreateUserDto }
  >(CREATE_USER);
  const { showAlert } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  // Get the current location
  useEffect(() => {
    //set mode by current url
    setMode(location.pathname === "/login" ? "login" : "register");
  }, [location, location.pathname]);
  useEffect(() => {
    if (apiCallError) {
      const message = getErrorListFromAPIError(apiCallError);
      showAlert(message);
    }
  }, [apiCallError]);
  useEffect(() => {
    if (createUserError) {
      const message = getErrorListFromAPIError(createUserError);
      showAlert(message);
    }
  }, [createUserError]);
  const validateLoginData = () => {
    if (!data.email || !data.password) {
      showAlert("Please enter email and password");
      return false;
    }
    return true;
  };
  const validateRegisterData = () => {
    if (!data.name || !data.email || !data.password || !data.repeatPassword) {
      showAlert("Please enter name, email, password and repeat password");
      return false;
    }
    if (data.password !== data.repeatPassword) {
      showAlert("Passwords do not match");
      return false;
    }
    return true;
  };
  const doLogin = async () => {
    if (!validateLoginData()) return;
    const apiInfo = AuthPath.login;
    apiInfo.body = {
      email: data.email!,
      password: data.password!,
    };
    const resp = await callRestAPi<{ token: string }>(apiInfo);
    if (resp) {
      apolloClient.refetchQueries({ include: "active" });
      navigate("/");
    }
  };

  const doRegister = async () => {
    if (!validateRegisterData()) return;
    await registerUser({
      variables: {
        data: {
          email: data.email!,
          password: data.password!,
        },
      },
    });

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        mode,
        data,
        setData,
        doLogin,
        apiError:
          (apiCallError && getErrorListFromAPIError(apiCallError)) ||
          (createUserError && getErrorListFromAPIError(createUserError)) ||
          null,
        apiLoading: apiLoading || createUserLoading,
        doRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
