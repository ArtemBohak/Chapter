import { FC } from "react";

import { useLocation } from "react-router-dom";
import styles from "./PublicHeader.module.scss";

import Logo from "@/src/components/SVGComponents/Logo";
import { links } from "@/src/types";

const PublicHeader: FC = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        {pathname !== links.HOME ? <Logo alt="chapter" /> : null}
      </div>
    </header>
  );
};

export default PublicHeader;
