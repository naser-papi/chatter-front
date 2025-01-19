import { Container } from "@mui/material";
import { css } from "@emotion/css";

const AppLayout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <Container
      className={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      {children}
    </Container>
  );
};

export default AppLayout;
