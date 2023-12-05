import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import { links } from "@/src/types";
import { useNavigationToggler } from "@/src/context";

import styles from "./SidebarNavigation.module.scss";

import { ProfileNavigation } from "../ProfileNavigation";
import { SidebarNavigationProps } from "./SidebarNavigation.type";

const SidebarNavigation: FC<SidebarNavigationProps> = (props) => {
  const { isActiveMenu } = useNavigationToggler();
  return (
    <div
      className={cn(styles["sidebar-navigation"], {
        [styles["active"]]: isActiveMenu,
      })}
    >
      <NavLink to={links.FEED} className={styles["sidebar-navigation__logo"]}>
        <img src="https://i.postimg.cc/0jD0P9kw/Chapter.webp" alt="Chapter" />
      </NavLink>
      <ProfileNavigation {...props} />
    </div>
  );
};

export default SidebarNavigation;
