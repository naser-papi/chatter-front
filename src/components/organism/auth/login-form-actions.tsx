import { useAuthContext } from "@/hooks";
import { LoadingButton } from "@mui/lab";

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
    </>
  );
};

export default LoginFormActions;
