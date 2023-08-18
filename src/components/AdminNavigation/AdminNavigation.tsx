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

function NavList({
  className,
  items,
}: {
  className?: string;
  items: NavigationLinkProps[];
}) {
  return (
    <ul className={cn(styles["admin-navigation__list"], className)}>
      {items.map((navItem) => (
        <li key={navItem.id} className={styles["admin-navigation__item"]}>
          <Link
            to={navItem.path}
            className={cn(styles["admin-navigation__link"])}
          >
            <Icon
              icon={navItem.icon}
              className={styles["admin-navigation__link-icon"]}
            />
            {navItem.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const AdminNavigation: FC = () => {
  return (
    <nav className={styles["admin-navigation"]}>
      <NavList
        className={styles["admin-navigation__top-nav-list"]}
        items={topNavigation}
      />
      <NavList
        className={styles["admin-navigation__bottom-nav-list"]}
        items={bottomNavigation}
      />
    </nav>
  );
};

export default AdminNavigation;
