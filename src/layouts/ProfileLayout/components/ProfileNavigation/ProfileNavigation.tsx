import { FC } from "react";

import { navigation } from "./ProfileNavigation.data";

import { useModal } from "@/src/hooks";

import { NavigationList } from "../NavigationList";
import { ProfileNavigationProps } from "./ProfileNavigation.type";
import styles from "./ProfileNavigation.module.scss";
import { Icon, IconEnum, Menu } from "@/src/components";
import { useNavigationToggler } from "@/src/context";

const ProfileNavigation: FC<ProfileNavigationProps> = (props) => {
  const { setIsActiveMenu } = useNavigationToggler();
  const menu = useModal();
  return (
    <nav className={styles["profile-navigation"]}>
      <NavigationList
        className={styles["profile-navigation__top-nav-list"]}
        items={navigation}
        {...props}
      />
      <button className={styles["btn"]} onClick={() => menu.setActive(true)}>
        <Icon icon={IconEnum.Menu} className={styles["btn-icon"]} />
        More
      </button>

      <Menu {...menu} setIsActiveMenu={setIsActiveMenu} />
    </nav>
  );
};

export default ProfileNavigation;
