import { useContext } from "react";
import { TextField } from "@mui/material";
import { AuthContext } from "@/contexts";

const LoginForm = () => {
  const { setData, mode, data } = useContext(AuthContext);
  if (mode !== "login") return null;
  return (
    <>
      <TextField
        type={"email"}
        label={"Email"}
        variant={"outlined"}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <TextField
        type={"password"}
        label={"Password"}
        variant={"outlined"}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
    </>
  );
};

export default LoginForm;
