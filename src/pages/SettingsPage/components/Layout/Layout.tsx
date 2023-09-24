import { FC } from "react";

import { LayoutProps } from "./Layout.type";
import styles from "./Layout.module.scss";

import { Icon, IconEnum } from "@/src/components";
import cn from "classnames";

const Layout: FC<LayoutProps> = ({
  children,
  editIcon = false,
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
      {editIcon ? (
        <button>
          <Icon
            icon={IconEnum.Edit}
            className={styles["layout-container__icon"]}
          />
        </button>
      ) : null}
    </div>
  );
};

export default Layout;
