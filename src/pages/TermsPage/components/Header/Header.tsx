import { FC } from "react";

import { useNavigationToggler } from "@/src/context";

import styles from "./Header.module.scss";

import { MenuToggler, Logo } from "@/src/components";

const Header: FC = () => {
  const { isActiveMenu, setIsActiveMenu } = useNavigationToggler();

  return (
    <header className={styles["profile-header"]}>
      <div className={styles["profile-header__container"]}>
        <MenuToggler
          isActive={isActiveMenu}
          className={styles["profile-header__menu-toggler"]}
          onClick={() => setIsActiveMenu && setIsActiveMenu(!isActiveMenu)}
        />
        <Logo className={styles["profile-header__logo-name"]} />
      </div>
    </header>
  );
};

export default Header;
