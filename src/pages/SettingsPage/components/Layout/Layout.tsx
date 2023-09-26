import { FC } from "react";

import { LayoutProps } from "./Layout.type";
import styles from "./Layout.module.scss";

import cn from "classnames";

const Layout: FC<LayoutProps> = ({
  children,

  title,
  fullWidth = false,
  className,
}) => {
  const containerClassNames = cn([
    styles["layout-container"],
    fullWidth
      ? styles["layout-container--full-width"]
      : styles["layout-container--width"],
    className,
  ]);
  return (
    <div className={containerClassNames}>
      {title ? (
        <h3 className={styles["layout-container__title"]}>{title}</h3>
      ) : null}
      {children}
    </div>
  );
};

export default Layout;
