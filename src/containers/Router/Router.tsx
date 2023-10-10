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
import { links } from "@/src/utils/links/links.types";

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
            path: links.SIGN_UP,
            element: <RegisterPage />,
          },
          {
            path: links.ACCOUNT_CREATION + "/:userId",
            element: <AccountCreationPage />,
          },
          {
            path: links.LOG_IN,
            element: <LoginPage />,
          },
          {
            path: links.FORGOT_PASSWORD,
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
        path: links.FEED,
        element: <FeedPage />,
      },
      {
        path: links.SETTINGS,
        element: <SettingsPage />,
      },
      { path: "/ui-page", element: <UIPage /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
