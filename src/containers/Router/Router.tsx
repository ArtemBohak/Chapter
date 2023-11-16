import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { links, keysValue } from "@/src/types";

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
  ProfilePage,
  RestorePage,
  PasswordChange,
  BooksPage,
  GuestProfilePage,
} from "@/src/pages";
import { PublicLayout, ProfileLayout } from "@/src/layouts";

import PublicRoute from "./Routes/PublicRoute/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./Routes/RestrictedRoute/RestrictedRoute";

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
                checkingKey={keysValue.USER_ID}
                checkingById
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
            path: links.PASSWORD_CHANGE + "/:userId",
            element: <PasswordChange />,
          },
          {
            path: links.RESTORE,
            element: (
              <RestrictedRoute
                component={<RestorePage />}
                checkingKey={keysValue.DELETED_ACCOUNT_TIME_STAMP}
              />
            ),
          },
        ],
      },
      // { path: "/ui-page", element: <UIPage /> },
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
      {
        path: "/books",
        element: <BooksPage />,
      },
      { path: links.PROFILE, element: <ProfilePage /> },
      { path: links.GUEST_PROFILE, element: <GuestProfilePage /> },
      { path: "/ui-page", element: <UIPage /> },
    ],
  },
  { path: "/ui-page", element: <UIPage /> },
  { path: "*", element: <ErrorPage /> },
  // { path: "/profile", element: <ProfilePage /> },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
