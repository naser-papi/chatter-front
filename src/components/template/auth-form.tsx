import {
  LoginForm,
  LoginFormActions,
  RegisterForm,
  RegisterFormActions,
} from "@/components/organism/auth";
import { css } from "@emotion/css";

const AuthForm = () => {
  return (
    <div
      className={css`
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        container-type: inline-size;
        container-name: auth-page;
        width: 100%;
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          .actions-row {
            width: 100%;
            margin-top: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            button {
              width: 40%;
            }
          }
        }
        @container auth-page (width < 760px) {
          .auth-form {
            width: 300px;
            .actions-row {
              flex-wrap: wrap;
              gap: 2rem;
              justify-content: center;
              button {
                width: 100%;
              }
            }
          }
        }
        @container auth-page (width > 760px) {
          .auth-form {
            width: 500px;
          }
        }
      `}
    >
      <form className={"auth-form"}>
        <LoginForm />
        <RegisterForm />
        <div className={"actions-row"}>
          <LoginFormActions />
          <RegisterFormActions />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
