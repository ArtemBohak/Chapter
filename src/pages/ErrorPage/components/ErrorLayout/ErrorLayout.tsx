import { FC } from "react";

import { PublicHeader } from "@/src/layouts/PublicHeader";

import { ErrorLayoutProps } from "./error-layout.type";

import styles from "./ErrorLayout.module.scss";

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => (
  <>
    <PublicHeader />
    <main>
      <section className={styles["error"]}>
        <div className={styles["error__container"]}>{children}</div>
      </section>
    </main>
  </>
);

export default ErrorLayout;
