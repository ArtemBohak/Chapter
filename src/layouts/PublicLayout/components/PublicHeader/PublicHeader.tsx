import { FC } from "react";


import Logo from "@/src/components/SVGComponents/Logo";
import styles from "./PublicHeader.module.scss";

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
