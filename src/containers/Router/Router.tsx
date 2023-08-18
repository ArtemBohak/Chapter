import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LoginPage, WelcomePage, AccountCreationPage } from '@/src/pages';

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage /> },
  { path: "/account-creation", element: <AccountCreationPage /> },
  {path: "/login", element: <LoginPage/>}
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
