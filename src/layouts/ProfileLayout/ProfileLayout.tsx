import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { links } from "@/src/utils/links/links.types";

import { ProfileHeader, SidebarNavigation } from "./components";
import { NavigationTogglerProvider } from "src/context/NavigationToggler";

import styles from "./ProfileLayout.module.scss";

const ProfileLayout: FC = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={links.WELCOME} />;
  }

  return (
    <div className={styles["profile-layout"]}>
      <NavigationTogglerProvider>
        <SidebarNavigation />
        <ProfileHeader />
      </NavigationTogglerProvider>
      <main>
        <div className={styles["profile-layout__body"]}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
