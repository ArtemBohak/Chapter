import { FC } from "react";

import { topNavigation, bottomNavigation } from "./ProfileNavigation.data";
import styles from "./ProfileNavigation.module.scss";

import { NavigationList } from "../NavigationList";
import { ProfileNavigationProps } from "./ProfileNavigation.type";

const ProfileNavigation: FC<ProfileNavigationProps> = (props) => {
  return (
    <nav className={styles["profile-navigation"]}>
      <NavigationList
        className={styles["profile-navigation__top-nav-list"]}
        items={topNavigation}
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
