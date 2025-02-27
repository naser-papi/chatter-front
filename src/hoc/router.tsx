import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth-page";
import HomePage from "@/pages/home-page";
import ProfilePage from "@/pages/profile-page";

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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

export default router;
