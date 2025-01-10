import { Button } from "@mui/material";
import { useAuthContext } from "@/hooks";

const RegisterFormActions = () => {
  const { doRegister, mode } = useAuthContext();
  if (mode !== "register") return null;
  return (
    <>
      <Button onClick={doRegister} variant={"contained"}>
        Register
      </Button>
    </>
  );
};

export default RegisterFormActions;
