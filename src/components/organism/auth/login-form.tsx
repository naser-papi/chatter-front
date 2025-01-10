import { TextField } from "@mui/material";
import { useAuthContext } from "@/hooks";

const LoginForm = () => {
  const { setData, mode, data } = useAuthContext();
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
