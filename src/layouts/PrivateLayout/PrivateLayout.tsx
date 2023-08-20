import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { PrivateHeader } from "../PrivateHeader";
import { SidebarNavigation } from "../SidebarNavigation";

import { NavigationTogglerProvider } from "src/context/NavigationToggler";

const PrivateLayout: FC = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavigationTogglerProvider>
        <SidebarNavigation />
        <PrivateHeader />
      </NavigationTogglerProvider>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
