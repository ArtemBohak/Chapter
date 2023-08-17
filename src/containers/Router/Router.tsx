import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WelcomePage, AccountCreationPage } from "@/src/pages";

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage /> },
  { path: "/account-creation", element: <AccountCreationPage /> },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
