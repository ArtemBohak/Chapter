import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "./AdminNavigation.module.scss";

import { NavigationLinkProps } from "./AdminNavigation.type";
import { Icon } from "../Icon";

import { topNavigation, bottomNavigation } from "./AdminNavigation.data";

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
