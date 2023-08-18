import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  RegisterPage,
  WelcomePage,
  AccountCreationPage,
  ErrorPage,
} from "@/src/pages";

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage />, errorElement: <ErrorPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/account-creation", element: <AccountCreationPage /> },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
