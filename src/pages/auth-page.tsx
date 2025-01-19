import { AuthProvider } from "@/contexts";
import AuthForm from "@/components/template/auth-form";

const AuthPage = () => {
  return (
    <AuthProvider>
      <AuthForm />
    </AuthProvider>
  );
};

export default AuthPage;
