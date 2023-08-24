import { FC } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { useNavigationToggler } from "@/src/context/NavigationToggler";
import { ProfileNavigation } from "../ProfileNavigation";
import styles from "./SidebarNavigation.module.scss";

const SidebarNavigation: FC = () => {
  const { isActiveMenu } = useNavigationToggler();
  return (
    <div
      className={cn(styles["sidebar-navigation"], {
        [styles["active"]]: isActiveMenu,
      })}
    >
      <NavLink to="/feed" className={styles["sidebar-navigation__logo"]}>
        <img src="https://i.postimg.cc/0jD0P9kw/Chapter.webp" alt="Chapter" />
      </NavLink>
      <ProfileNavigation />
    </div>
  );
};

export default SidebarNavigation;
