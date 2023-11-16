import { FC, MouseEvent, TouchEvent, useMemo, useRef } from "react";
import { GetState, GetCity } from "react-country-state-city";

import { CityType, StateType } from "../../UserLocation.type";
import { SelectMenuProps } from "./SelectMenu.type";
import styles from "./SelectMenu.module.scss";
import { Animation } from "@/src/components";

const SelectMenu: FC<SelectMenuProps> = ({
  type,
  menuIsOpen,
  data,
  selectedValue,
  countryId,
  transitionTimeOut = 150,
  setIcon,
  setSelectedRegion,
  setRegionData,
  setCitiesData,
  setSelectedValue,
  setId,
  setIsLoading,
  setSelectMenuIsOpen,
  setSelectedCity,
}) => {
  const menuRef = useRef(null);

  const filteredData = useMemo(
    () =>
      data.filter((city) =>
        city.name.toLowerCase().includes(selectedValue.toLowerCase())
      ),
    [data, selectedValue]
  );

  const handleSelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSelectedRegion && setSelectedRegion("");
    setRegionData && setRegionData([]);
    setSelectedCity && setSelectedCity("");
    setCitiesData && setCitiesData([]);
    const id = +e.currentTarget.value;
    const result = filteredData.find((item) => item.id === id);

    if (result) {
      setId(result.id);
      setSelectedValue(result.name);
      if (result.emoji && setIcon) setIcon(result.emoji);
      setSelectMenuIsOpen(false);
      setIsLoading && setIsLoading(true);

      if (type === "country") {
        GetState(result.id).then((result: StateType[]) => {
          setRegionData && setRegionData(result);
          setIsLoading && setIsLoading(false);
        });
      }

      if (type === "state") {
        GetCity(countryId, result.id).then((result: CityType[]) => {
          setCitiesData && setCitiesData(result);
          setIsLoading && setIsLoading(false);
        });
      }
    }
  };

  const transitionClassNames = {
    enter: styles["select-menu-enter"],
    enterActive: styles["select-menu-enter-active"],
    exit: styles["select-menu-exit"],
    exitActive: styles["select-menu-exit-active"],
  };

  return (
    <Animation
      isMount={menuIsOpen}
      nodeRef={menuRef}
      timeout={transitionTimeOut}
      mountOnEnter
      unmountOnExit
      classNames={transitionClassNames}
    >
      <span className={styles["strop-down-menu"]}>
        <span className={styles["strop-down-menu-container"]} ref={menuRef}>
          {filteredData.map(({ id, name, emoji }) => (
            <button
              type="button"
              key={id}
              value={id}
              data-automation="clickButton"
              onClick={handleSelect}
            >
              {emoji ? <span>{emoji}</span> : null}
              <span>{name}</span>
            </button>
          ))}
        </span>
      </span>
    </Animation>
  );
};

export default SelectMenu;
