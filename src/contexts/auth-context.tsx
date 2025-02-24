import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert, useCallApi, useCallMutation } from "@/hooks";
import { apolloClient, AuthPath } from "@/constants";
import { CreateUserDto } from "@/dto/auth";
import { CREATE_USER } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";

interface AuthContextProps {
  mode: "login" | "register";
  data: {
    fullName?: string;
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

export const AuthContext = createContext({} as AuthContextProps);

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
    doLogout();
  }, [location, location.pathname]);
  useEffect(() => {
    if (apiCallError) {
      const message = getErrorListFromAPIError(apiCallError);
      showAlert(message, "error");
    }
  }, [apiCallError]);
  useEffect(() => {
    if (createUserError) {
      const message = getErrorListFromAPIError(createUserError);
      showAlert(message, "error");
    }
  }, [createUserError]);
  const validateLoginData = () => {
    if (!data.email || !data.password) {
      showAlert("Please enter email and password", "error");
      return false;
    }
    return true;
  };
  const validateRegisterData = () => {
    if (
      !data.fullName ||
      !data.email ||
      !data.password ||
      !data.repeatPassword
    ) {
      showAlert(
        "Please enter name, email, password and repeat password",
        "error",
      );
      return false;
    }
    if (data.password !== data.repeatPassword) {
      showAlert("Passwords do not match", "error");
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
      showAlert("Login successful", "success");
      navigate("/");
    }
  };

  const doRegister = async () => {
    if (!validateRegisterData()) return;
    await registerUser({
      variables: {
        data: {
          fullName: data.fullName!,
          email: data.email!,
          password: data.password!,
        },
      },
    });

    navigate("/login");
  };
  const doLogout = async () => {
    const apiInfo = AuthPath.logout;
    await callRestAPi(apiInfo);
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
