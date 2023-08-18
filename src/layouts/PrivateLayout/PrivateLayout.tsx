import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { PrivateHeader } from "../PrivateHeader";
import { SidebarNavigation } from "../SidebarNavigation";

const PrivateLayout: FC = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <SidebarNavigation />
      <PrivateHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
