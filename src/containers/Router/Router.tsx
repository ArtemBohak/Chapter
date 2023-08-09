import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LoginPage, WelcomePage } from '@/src/pages';

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/login', element: <LoginPage /> },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
