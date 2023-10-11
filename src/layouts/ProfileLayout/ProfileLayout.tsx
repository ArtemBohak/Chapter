import { FC } from "react";
import { Outlet } from "react-router-dom";

import { ProfileHeader, SidebarNavigation } from "./components";
import { NavigationTogglerProvider } from "src/context/NavigationToggler";

import styles from "./ProfileLayout.module.scss";

const ProfileLayout: FC = () => (
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

export default ProfileLayout;
