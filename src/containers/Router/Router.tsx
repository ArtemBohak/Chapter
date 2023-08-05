import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WelcomePage } from "@/src/pages";

const router = createBrowserRouter([{ path: "/", element: <WelcomePage /> }]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
