import { ChangeEvent, FC } from "react";
import cn from "classnames";

import { FieldProps } from "./Field.type";
import styles from "./Field.module.scss";

const Field: FC<FieldProps> = ({
  selectMenuIsOpen,
  icon,
  selectedValue,
  label,
  setIcon,
  setSelectMenuIsOpen,
  setSelectedValue,
  setId,
  setRegionList,
  setSelectedRegion,
  setRegionId,
  setCitiesList,
  setSelectedCity,
  setCityId,
}) => {
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectMenuIsOpen(true);
    setSelectedValue(e.target.value);
    setId(0);

    setIcon && setIcon("");

    setRegionList && setRegionList([]);
    setSelectedRegion && setSelectedRegion("");
    setRegionId && setRegionId(0);

    setCitiesList && setCitiesList([]);
    setSelectedCity && setSelectedCity("");
    setCityId && setCityId(0);
  };

  const toggleMenu = () => setSelectMenuIsOpen(!selectMenuIsOpen);

  const arrowClassNames = cn(styles["arrow"], {
    [styles["arrow--down"]]: !selectMenuIsOpen,
    [styles["arrow--up"]]: selectMenuIsOpen,
  });

  const iconClassName = cn({ [styles["flag"]]: icon });

  return (
    <>
      {label ? <span className={styles["label"]}>{label}</span> : null}
      <span className={styles["strop-down-container"]}>
        {icon ? <span className={styles["icon"]}>{icon}</span> : null}
        <input
          className={iconClassName}
          type="text"
          name="country"
          value={selectedValue}
          onChange={handleChangeValue}
          data-automation="locationInput"
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
    </>
  );
};

export default Field;
