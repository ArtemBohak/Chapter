import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "./AdminNavigation.module.scss";

import { NavigationLinkProps } from "./AdminNavigation.type";
import { Icon, IconEnum } from "../Icon";

const topNavigation: NavigationLinkProps[] = [
  {
    id: "1",
    path: "/",
    icon: IconEnum.Home,
    name: "Feed",
  },
  {
    id: "2",
    path: "/",
    icon: IconEnum.Search,
    name: "Search",
  },
  {
    id: "3",
    path: "/",
    icon: IconEnum.Notification,
    name: "Notification",
  },
  {
    id: "4",
    path: "/",
    icon: IconEnum.User,
    name: "Profile",
  },
];

const bottomNavigation: NavigationLinkProps[] = [
  {
    id: "5",
    path: "/",
    icon: IconEnum.Settings,
    name: "Settings",
  },
  {
    id: "6",
    path: "/",
    icon: IconEnum.SignOut,
    name: "Logout",
  },
];

const AdminNavigation: FC = () => {
  return (
    <nav className={styles["admin-navigation"]}>
      <ul
        className={cn(
          styles["admin-navigation__list"],
          styles["admin-navigation__top-nav-list"]
        )}
      >
        {topNavigation.map((navItem) => (
          <li key={navItem.id} className={styles["admin-navigation__item"]}>
            <Icon icon={navItem.icon} size={24} />
            <Link to={navItem.path}>{navItem.name}</Link>
          </li>
        ))}
      </ul>
      <ul
        className={cn(
          styles["admin-navigation__list"],
          styles["admin-navigation__bottom-nav-list"]
        )}
      >
        {bottomNavigation.map((navItem) => (
          <li key={navItem.id} className={styles["admin-navigation__item"]}>
            <Icon icon={navItem.icon} size={24} color="#000000" />
            <Link to={navItem.path}>{navItem.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavigation;
