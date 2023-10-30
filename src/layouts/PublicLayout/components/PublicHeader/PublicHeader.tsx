import { FC } from "react";

import styles from "./PublicHeader.module.scss";

import Logo from "@/src/components/SVGComponents/Logo";

const PublicHeader: FC = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        <Logo alt="chapter" />
      </div>
    </header>
  );
};

export default PublicHeader;
