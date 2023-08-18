import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RegisterPage, WelcomePage, AccountCreationPage, LoginPage } from "@/src/pages";
import { PublicLayout } from "@/src/layouts/PublicLayout";

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
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
