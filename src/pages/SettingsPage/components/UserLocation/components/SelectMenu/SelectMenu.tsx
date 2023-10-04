import { FC, MouseEvent, TouchEvent, useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { GetState, GetCity } from "react-country-state-city";

import { CityType, StateType } from "../../UserLocation.type";
import { SelectMenuProps } from "./SelectMenu.type";
import styles from "./SelectMenu.module.scss";

const SelectMenu: FC<SelectMenuProps> = ({
  type,
  menuIsOpen,
  data,
  selectedValue,
  countryId,
  transitionTimeOut = 200,
  setIcon,
  setSelectedState,
  setStateData,
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
    setSelectedState && setSelectedState("");
    setStateData && setStateData([]);
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
          setStateData && setStateData(result);
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
    <CSSTransition
      in={menuIsOpen}
      nodeRef={menuRef}
      timeout={transitionTimeOut}
      mountOnEnter
      unmountOnExit
      classNames={transitionClassNames}
    >
      <span className={styles["strop-down-menu"]}>
        <span ref={menuRef} className={styles["strop-down-menu-container"]}>
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
    </CSSTransition>
  );
};

export default SelectMenu;
