import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import PrivateHeader from "../PrivateHeader/PrivateHeader";

const PrivateLayout: FC = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PrivateHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
