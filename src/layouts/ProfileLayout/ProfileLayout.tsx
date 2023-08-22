import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ProfileHeader, SidebarNavigation } from "./components";
import { NavigationTogglerProvider } from "src/context/NavigationToggler";

const ProfileLayout: FC = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="profile-layout">
      <NavigationTogglerProvider>
        <SidebarNavigation />
        <ProfileHeader />
      </NavigationTogglerProvider>
      <main>
        <div className="profile-layout__body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
