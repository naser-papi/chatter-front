import { useAuthContext } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import { Link } from "@mui/material";

const LoginFormActions = () => {
  const { doLogin, mode, apiLoading } = useAuthContext();
  if (mode !== "login") return null;
  return (
    <>
      <LoadingButton
        onClick={doLogin}
        variant={"contained"}
        loadingPosition="end"
        loading={apiLoading}
        disabled={apiLoading}
      >
        Login
      </LoadingButton>
      <Link href={"/register"}>Create New Account</Link>
    </>
  );
};

export default LoginFormActions;
