import { useContext } from "react";
import { Button, Link } from "@mui/material";
import { AuthContext } from "@/contexts";

const RegisterFormActions = () => {
  const { doRegister, mode } = useContext(AuthContext);
  if (mode !== "register") return null;
  return (
    <>
      <Button onClick={doRegister} variant={"contained"}>
        Register
      </Button>
      <Link href={"/login"}>Login To Account</Link>
    </>
  );
};

export default RegisterFormActions;
