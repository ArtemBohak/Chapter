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
}) => {
  const containerClassNames = cn([
    styles["container"],
    fullWidth ? styles["container--full-width"] : styles["container--width"],
  ]);
  return (
    <div className={containerClassNames}>
      {title ? <h4 className={styles["container__title"]}>{title}</h4> : null}
      {children}
      {editIcon ? (
        <button>
          <Icon icon={IconEnum.Edit} className={styles["icon"]} />
        </button>
      ) : null}
    </div>
  );
};

export default Layout;
