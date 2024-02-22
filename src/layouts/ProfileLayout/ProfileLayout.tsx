import { FC, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import styles from "./ProfileLayout.module.scss";

import { ProfileHeader, SidebarNavigation } from "./components";
import { NavigationTogglerProvider, ProfileProvider } from "@/src/context";
import { PostCreation } from "@/src/components";
import { links } from "@/src/types";

const ProfileLayout: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();

  return (
    <ProfileProvider>
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
        {location.pathname !== links.NOTIFICATION ? (
          <Toaster position="bottom-right" reverseOrder={true} gutter={14} />
        ) : null}
      </div>
    </ProfileProvider>
  );
};

export default ProfileLayout;
