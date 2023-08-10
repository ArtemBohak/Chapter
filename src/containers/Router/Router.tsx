import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RegisterPage, WelcomePage } from "@/src/pages";

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage /> },
  { path: "register", element: <RegisterPage /> },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
