import { FC } from "react";
import { NavigationList } from "../NavigationList";

import { topNavigation, bottomNavigation } from "./ProfileNavigation.data";
import styles from "./ProfileNavigation.module.scss";

const ProfileNavigation: FC = () => {
  return (
    <nav className={styles["profile-navigation"]}>
      <NavigationList
        className={styles["profile-navigation__top-nav-list"]}
        items={topNavigation}
      />
      <NavigationList
        className={styles["profile-navigation__bottom-nav-list"]}
        items={bottomNavigation}
        isBottom
      />
    </nav>
  );
};

export default ProfileNavigation;
