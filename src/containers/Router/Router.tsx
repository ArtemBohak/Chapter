import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  RegisterPage,
  WelcomePage,
  AccountCreationPage,
  LoginPage,
  UIPage,
} from "@/src/pages";
import { PublicLayout } from "@/src/layouts/PublicLayout";
  AdminPage,
  SettingsPage,
} from "@/src/pages";
import { PublicLayout, PrivateLayout } from "@/src/layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/account-creation",
        element: <AccountCreationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/ui-page",
        element: <UIPage />,
    ],
  },
  {
    path: "/admin",
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "/admin/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
