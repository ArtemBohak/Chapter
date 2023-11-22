import { FC, useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "./ProfileLayout.module.scss";

import { ProfileHeader, SidebarNavigation } from "./components";
import { NavigationTogglerProvider } from "src/context/NavigationToggler";
import { CookiesToaster } from "@/src/components/CookiesToaster";
import { PostCreation } from "@/src/components";

const ProfileLayout: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className={styles["profile-layout"]}>
      <NavigationTogglerProvider>
        <SidebarNavigation setModalIsOpen={setModalIsOpen} />
        <ProfileHeader setModalIsOpen={setModalIsOpen} />
      </NavigationTogglerProvider>
      <main>
        <Outlet />
        <CookiesToaster />
        <PostCreation isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      </main>
    </div>
  );
};

export default ProfileLayout;
