import { FC, useState } from "react";

import { useLocation } from "react-router-dom";
import styles from "./PublicHeader.module.scss";

import Logo from "@/src/components/SVGComponents/Logo";
import { links } from "@/src/types";

const PublicHeader: FC = () => {
  const { pathname } = useLocation();
  const [error, setError] = useState(false);

  if (error) throw new Error("");

  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        {pathname !== links.WELCOME ? <Logo alt="chapter" /> : null}
      </div>
      <button
        className="bg-red text-white"
        onClick={() => {
          setError(true);
        }}
      >
        ERROR
      </button>
    </header>
  );
};

export default PublicHeader;
