import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout: FC = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      PrivateLayout
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
