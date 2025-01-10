import ReactDOM from "react-dom/client";
import { Alert, AlertTitle } from "@mui/material";
import { css } from "@emotion/css";

const useAlert = () => {
  const showAlert = (message: string | string[]) => {
    const msgSet = Array.isArray(message)
      ? new Set(message)
      : new Set([message]);
    const component = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>{" "}
        <ul>
          {Array.from(msgSet).map((msg) => (
            <li>{msg}</li>
          ))}
        </ul>
      </Alert>
    );

    const div = document.createElement("div");
    div.className = css`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100vw;
      padding: 16px;
      [role="alert"] {
        max-width: 500px;
        margin: 0 auto;
        font-size: 1.1rem;
      }
    `;
    document.getElementById("root")!.appendChild(div);

    const root = ReactDOM.createRoot(div);
    root.render(component);

    setTimeout(() => {
      root.unmount();
      document.getElementById("root")!.removeChild(div);
    }, 3000); // Automatically remove the alert after 5 seconds
  };

  return { showAlert };
};

export default useAlert;
