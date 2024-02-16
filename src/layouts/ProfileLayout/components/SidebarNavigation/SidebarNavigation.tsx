import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import { links } from "@/src/types";
import { useNavigationToggler } from "@/src/context";

import styles from "./SidebarNavigation.module.scss";

import { ProfileNavigation } from "../ProfileNavigation";
import { SidebarNavigationProps } from "./SidebarNavigation.type";
import { Logo } from "@/src/components";

const SidebarNavigation: FC<SidebarNavigationProps> = (props) => {
  const { isActiveMenu } = useNavigationToggler();
  return (
    <div
      className={cn(styles["sidebar-navigation"], {
        [styles["active"]]: isActiveMenu,
      })}
    >
      <NavLink to={links.FEED} className={styles["sidebar-navigation__logo"]}>
       <Logo className="max-w-[280px]"/>
      </NavLink>
      <ProfileNavigation {...props} />
    </div>
  );
};

export default SidebarNavigation;
