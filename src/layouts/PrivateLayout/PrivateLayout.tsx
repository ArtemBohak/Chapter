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
    <div className="private-layout">
      <NavigationTogglerProvider>
        <SidebarNavigation />
        <PrivateHeader />
      </NavigationTogglerProvider>
      <main>
        <div className="private-layout__body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
