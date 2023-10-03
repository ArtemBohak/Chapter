import { FC } from "react";
import cn from "classnames";

import { FieldProps } from "./Field.type";
import styles from "./Field.module.scss";

const Field: FC<FieldProps> = ({
  menuIsOpen,
  icon,
  selectedValue,
  toggleMenu,
  handleChangeValue,
}) => {
  const arrowClassNames = cn(styles["arrow"], {
    [styles["arrow--down"]]: !menuIsOpen,
    [styles["arrow--up"]]: menuIsOpen,
  });

  const iconClassName = cn({ [styles["flag"]]: icon });

  return (
    <span className={styles["strop-down-container"]}>
      {icon ? <span className={styles["icon"]}>{icon}</span> : null}
      <input
        className={iconClassName}
        type="text"
        name="country"
        value={selectedValue}
        onChange={handleChangeValue}
        data-automation="countryInput"
      />
      <button
        className={styles["arrow-btn"]}
        type="button"
        data-automation="clickButton"
        onClick={toggleMenu}
      >
        <span className={arrowClassNames}></span>
      </button>
    </span>
  );
};

export default Field;
