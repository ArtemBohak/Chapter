import { FC } from "react";
import { NavLink } from "react-router-dom";

import AdminNavigation from "@/src/components/AdminNavigation/AdminNavigation";

import styles from "./SidebarNavigation.module.scss";

const SidebarNavigation: FC = () => {
  return (
    <div className={styles["sidebar-navigation"]}>
      <NavLink to="/admin" className={styles["sidebar-navigation__logo"]}>
        <img src="https://i.postimg.cc/0jD0P9kw/Chapter.webp" alt="Chapter" />
      </NavLink>
      <AdminNavigation />
    </div>
  );
};

export default SidebarNavigation;
