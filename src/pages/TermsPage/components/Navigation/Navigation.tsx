import { FC } from "react";

import styles from "./Navigation.module.scss";
import { NavigationList } from "..";
import { navigation, bottomNavigation } from "./Navigation.data";

const Navigation: FC = () => {
  return (
    <nav className={styles["profile-navigation"]}>
      <NavigationList
        className={styles["profile-navigation__top-nav-list"]}
        items={navigation}
      />
      <NavigationList
        className={styles["profile-navigation__bottom-nav-list"]}
        items={bottomNavigation}
        isBottom
      />
    </nav>
  );
};

export default Navigation;
