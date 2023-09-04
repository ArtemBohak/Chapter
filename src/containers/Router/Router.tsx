import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import {
  RegisterPage,
  WelcomePage,
  AccountCreationPage,
  LoginPage,
  ErrorPage,
  ForgotPasswordPage,
  UIPage,
  FeedPage,
  SettingsPage,
} from "@/src/pages";

import { PublicLayout, ProfileLayout } from "@/src/layouts";

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
        path: "auth",
        element: <Outlet />,
        children: [
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "account-creation",
            element: <AccountCreationPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
        ],
      },
      { path: "/ui-page", element: <UIPage /> },
    ],
  },
  {
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        path: "/feed",
        element: <FeedPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

const Router = () => {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};

export default Router;
