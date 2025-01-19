import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth-page.tsx";
import HomePage from "@/pages/home-page.tsx";

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
