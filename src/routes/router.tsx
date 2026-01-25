import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { welcomeRoutes } from "./welcomeRoutes";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <div>home</div>,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [welcomeRoutes],
  },
]);
