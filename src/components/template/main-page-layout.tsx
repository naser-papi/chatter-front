import { css } from "@emotion/css";

const MainPageLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <main
      className={css`
        display: grid;
        grid-template-rows: auto 1fr;
        height: 100%;
      `}
    >
      {children}
    </main>
  );
};

export default MainPageLayout;
