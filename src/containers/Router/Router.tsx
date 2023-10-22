import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { links } from "@/src/utils";
import PublicRoute from "./Routes/PublicRoute/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./Routes/RestrictedRoute/RestrictedRoute";
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
  RestorePage,
} from "@/src/pages";
import { PublicLayout, ProfileLayout } from "@/src/layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute component={<PublicLayout />} />,
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
            element: (
              <RestrictedRoute
                component={<AccountCreationPage />}
                checkingKey="userId"
              />
            ),
          },
          {
            path: links.LOG_IN,
            element: <LoginPage />,
          },
          {
            path: links.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: links.RESTORE,
            element: (
              <RestrictedRoute
                component={<RestorePage />}
                checkingKey="provider"
              />
            ),
          },
        ],
      },
      { path: "/ui-page", element: <UIPage /> },
    ],
  },
  {
    element: <PrivateRoute component={<ProfileLayout />} />,
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
