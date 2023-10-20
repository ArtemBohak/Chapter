import { FC } from "react";

import { LayoutProps } from "./Layout.type";
import styles from "./Layout.module.scss";

import cn from "classnames";

const Layout: FC<LayoutProps> = ({
  children,
  title,
  fullWidth = false,
  className,
  customSpacing = false,
}) => {
  const containerClassNames = cn(
    styles["layout"],
    {
      [styles["layout-width--full"]]: fullWidth,
      [styles["layout-width"]]: !fullWidth,
      [styles["layout--base"]]: !customSpacing,
      [styles["layout--story"]]: customSpacing,
    },
    className
  );
  return (
    <div className={containerClassNames}>
      {title ? <h3 className={styles["layout__title"]}>{title}</h3> : null}
      {children}
    </div>
  );
};

export default Layout;
