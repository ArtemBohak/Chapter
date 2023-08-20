import { FC } from "react";
import { NavigationList } from "../NavigationList";

import { topNavigation, bottomNavigation } from "./AdminNavigation.data";
import styles from "./AdminNavigation.module.scss";

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
