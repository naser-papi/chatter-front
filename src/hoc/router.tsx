import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth-page.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/register",
    element: <AuthPage />,
  },
]);

export default router;
