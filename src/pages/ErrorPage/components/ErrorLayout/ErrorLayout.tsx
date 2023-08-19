import { FC } from "react";
import { Link } from "react-router-dom";

import Logo from "@/src/components/SVGComponents/Logo";

import { ErrorLayoutProps } from "./error-layout.type";

import styles from "./ErrorLayout.module.scss";

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => (
  <>
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        <Link to="/">
          <Logo alt="chapter" isHidden={false} />
        </Link>
      </div>
    </header>
    <main>
      <section className={styles["error"]}>
        <div className={styles["error__container"]}>{children}</div>
      </section>
    </main>
  </>
);

export default ErrorLayout;
