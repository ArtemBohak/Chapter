import { FC } from "react";

import AdminNavigation from "@/src/components/AdminNavigation/AdminNavigation";

import styles from "./SidebarNavigation.module.scss";

const SidebarNavigation: FC = () => {
  return (
    <div className={styles["sidebar-navigation"]}>
      <div className={styles["sidebar-navigation__logo"]}>
        <img src="https://i.postimg.cc/0jD0P9kw/Chapter.webp" alt="Chapter" />
      </div>
      <AdminNavigation />
    </div>
  );
};

export default SidebarNavigation;
