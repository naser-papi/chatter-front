import { Button, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthPath, apolloClient } from "@/constants";
import { useCallApi } from "@/hooks";
import { getApolloErrorList } from "@/helpers/utils.ts";
import { useMutation } from "@apollo/client";
import { CreateUserDto } from "@/dto/auth.ts";
import { CREATE_USER } from "@/constants/graphql-query";
import "./styles.css";
import useAlert from "@/hooks/use-alert.tsx";

const AuthForm = () => {
  const [createUser, { error }] = useMutation<
    CreateUserDto,
    { data: CreateUserDto }
  >(CREATE_USER);
  const { showAlert } = useAlert();
  const { callRestAPI } = useCallApi();

  const location = useLocation(); // Get the current location
  const [model, setModel] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    if (error) {
      showAlert(getApolloErrorList(error));
    }
  }, [error]);
  const isLoginPath = location.pathname === "/login";
  const doLoginOrRegister = async () => {
    if (isLoginPath) {
      const apiInfo = AuthPath.login;
      apiInfo.body = {
        email: model.email,
        password: model.password,
      };
      const resp = await callRestAPI(apiInfo);
      if (resp) {
        apolloClient.refetchQueries({ include: "active" });
        console.log(resp);
      }
    } else {
      await createUser({
        variables: {
          data: {
            email: model.email,
            password: model.password,
          },
        },
      });
    }
  };
  return (
    <Stack spacing={3} className={"auth-form"}>
      <TextField
        type={"email"}
        label={"Email"}
        variant={"outlined"}
        onChange={(e) => setModel({ ...model, email: e.target.value })}
      />
      <TextField
        type={"password"}
        label={"Password"}
        variant={"outlined"}
        onChange={(e) => setModel({ ...model, password: e.target.value })}
      />
      {!isLoginPath && (
        <TextField
          type={"password"}
          label={"Repeat Password"}
          variant={"outlined"}
          onChange={(e) =>
            setModel({ ...model, repeatPassword: e.target.value })
          }
        />
      )}
      <Button onClick={doLoginOrRegister} variant={"contained"}>
        {isLoginPath ? "Login" : "Register"}
      </Button>
    </Stack>
  );
};

export default AuthForm;
