import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth-page";
import HomePage from "@/pages/home-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/register",
    element: <AuthPage />,
  },
  {
    path: "/chats/:id",
    element: <HomePage />,
  },
]);

export default router;
