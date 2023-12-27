import { FC, useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "./ProfileLayout.module.scss";

import { ProfileHeader, SidebarNavigation } from "./components";
import { NavigationTogglerProvider, ModalsProvider } from "@/src/context";
import { PostCreation } from "@/src/components";

const ProfileLayout: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <ModalsProvider>
      <div className={styles["profile-layout"]}>
        <NavigationTogglerProvider>
          <SidebarNavigation setModalIsOpen={setModalIsOpen} />
          <ProfileHeader setModalIsOpen={setModalIsOpen} />
        </NavigationTogglerProvider>
        <main>
          <Outlet />
          <PostCreation
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            disableScroll
            isScreenSize
          />
        </main>
      </div>
    </ModalsProvider>
  );
};

export default ProfileLayout;
