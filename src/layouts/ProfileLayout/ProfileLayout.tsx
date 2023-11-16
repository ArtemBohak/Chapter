import { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from "./ProfileLayout.module.scss";

import { ProfileHeader, SidebarNavigation } from "./components";
import { NavigationTogglerProvider } from "src/context/NavigationToggler";
import { CookiesToaster } from "@/src/components/CookiesToaster";

const ProfileLayout: FC = () => (
  <div className={styles["profile-layout"]}>
    <NavigationTogglerProvider>
      <SidebarNavigation />
      <ProfileHeader />
    </NavigationTogglerProvider>
    <main>
      <Outlet />
      <CookiesToaster />
    </main>
  </div>
);

export default ProfileLayout;
