import { FC } from "react";
import { NavigationList } from "../NavigationList";

import { topNavigation, bottomNavigation } from "./AdminNavigation.data";
import styles from "./AdminNavigation.module.scss";

const AdminNavigation: FC = () => {
  return (
    <nav className={styles["admin-navigation"]}>
      <NavigationList
        className={styles["admin-navigation__top-nav-list"]}
        items={topNavigation}
      />
      <NavigationList
        className={styles["admin-navigation__bottom-nav-list"]}
        items={bottomNavigation}
      />
    </nav>
  );
};

export default AdminNavigation;
