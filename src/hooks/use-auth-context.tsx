import {
  useContext,
  createContext,
  useEffect,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallApi } from "@/hooks";
import { AuthPath } from "@/constants";
import useAlert from "@/hooks/use-alert.tsx";
import { CreateUserDto, LoginDto } from "@/dto/auth.ts";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/constants/graphql-query";
import { getApolloErrorList } from "@/helpers/utils.ts";

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
  apiCallError: string;
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
  const [registerUser, { error: createUserError, loading: createUserLoading }] =
    useMutation<CreateUserDto, { data: CreateUserDto }>(CREATE_USER);
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
      showAlert(apiCallError);
    }
  }, [apiCallError]);
  useEffect(() => {
    if (createUserError) {
      showAlert(getApolloErrorList(createUserError));
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
    const resp = await callRestAPi<LoginDto>(apiInfo);
    if (resp) {
      console.log(resp);
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
        apiCallError,
        apiLoading: apiLoading || createUserLoading,
        doRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
