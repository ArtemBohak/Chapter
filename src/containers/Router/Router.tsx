import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PublicLayout } from "@/src/layouts/PublicLayout";
import {
  WelcomePage,
  RegisterPage,
  LoginPage,
  AccountCreationPage,
  ErrorPage,
} from "@/src/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
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
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
