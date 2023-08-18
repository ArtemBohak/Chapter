import { FC } from "react";
import { NavLink } from "react-router-dom";

import Logo from "@/src/components/SVGComponents/Logo";
import styles from "./PublicHeader.module.scss";

const PublicHeader: FC = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        <NavLink to="/">
          <Logo alt="chapter" />
        </NavLink>
      </div>
    </header>
  );
};

export default PublicHeader;
