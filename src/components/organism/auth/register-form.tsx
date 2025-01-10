import { TextField } from "@mui/material";
import { useAuthContext } from "@/hooks";

const RegisterForm = () => {
  const { setData, mode, data } = useAuthContext();
  if (mode !== "register") return null;
  return (
    <>
      <TextField
        type={"text"}
        name={"name"}
        label={"Full Name"}
        variant={"outlined"}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <TextField
        type={"email"}
        name={"email"}
        label={"Email"}
        variant={"outlined"}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <TextField
        type={"password"}
        name={"password"}
        label={"Password"}
        variant={"outlined"}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <TextField
        type={"password"}
        name={"repeatPassword"}
        label={"Repeat Password"}
        variant={"outlined"}
        onChange={(e) => setData({ ...data, repeatPassword: e.target.value })}
      />
    </>
  );
};

export default RegisterForm;
