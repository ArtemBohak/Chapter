import { FC } from "react";

import {
  mobNavigation,
  tabletNavigation,
  bottomNavigation,
} from "./ProfileNavigation.data";
import { useGetScreenSize } from "@/src/hooks";
import { tabScreen } from "@/src/utils";
import styles from "./ProfileNavigation.module.scss";

import { NavigationList } from "../NavigationList";
import { ProfileNavigationProps } from "./ProfileNavigation.type";

const ProfileNavigation: FC<ProfileNavigationProps> = (props) => {
  const [screenSize] = useGetScreenSize();

  const screenNav = screenSize < tabScreen ? mobNavigation : tabletNavigation;

  return (
    <nav className={styles["profile-navigation"]}>
      <NavigationList
        className={styles["profile-navigation__top-nav-list"]}
        items={screenNav}
        {...props}
      />
      <NavigationList
        className={styles["profile-navigation__bottom-nav-list"]}
        items={bottomNavigation}
        isBottom
        {...props}
      />
    </nav>
  );
};

export default ProfileNavigation;
