import { FC } from "react";
import cn from "classnames";

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
      <div className={styles["sidebar-navigation__logo"]}>
        <Logo className="max-w-[280px]" />
      </div>
      <ProfileNavigation {...props} />
    </div>
  );
};

export default SidebarNavigation;
