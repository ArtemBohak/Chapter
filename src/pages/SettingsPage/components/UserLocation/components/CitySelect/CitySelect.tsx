import { FC, useState, useEffect, useRef } from "react";

import { useOutsideClick } from "@/src/hooks";

import { CitySelectProps } from "./CitySelect.type";
import styles from "../../UserLocation.module.scss";

import Field from "../Field/Field";
import SelectMenu from "../SelectMenu/SelectMenu";
import { Animation } from "@/src/components";

const CitySelect: FC<CitySelectProps> = ({
  citiesList,
  regionId,
  cityId,
  selectedCity,
  transitionTimeOut,
  setCityId,
  setSelectedCity,
  ...props
}) => {
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
  const cityRef = useRef(null);
  useOutsideClick(cityRef, setSelectMenuIsOpen);

  useEffect(() => {
    const city = citiesList.find((item) => item.id === cityId);

    city && setSelectedCity(city.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesList, cityId]);

  const isShowing =
    !!(regionId && citiesList.length) || !!(citiesList.length && cityId);

  const transitionClassNames = {
    enter: styles["select-menu-enter"],
    enterActive: styles["select-menu-enter-active"],
    exit: styles["select-menu-exit"],
    exitActive: styles["select-menu-exit-active"],
  };

  return (
    <Animation
      isMount={isShowing}
      nodeRef={cityRef}
      timeout={transitionTimeOut}
      mountOnEnter
      unmountOnExit
      classNames={transitionClassNames}
    >
      <label ref={cityRef} className={styles["location-form__label"]}>
        <Field
          selectMenuIsOpen={selectMenuIsOpen}
          selectedValue={selectedCity}
          setSelectMenuIsOpen={setSelectMenuIsOpen}
          setSelectedValue={setSelectedCity}
          setId={setCityId}
          {...props}
        />
        <SelectMenu
          selectMenuIsOpen={selectMenuIsOpen}
          data={citiesList}
          selectedValue={selectedCity}
          setSelectedValue={setSelectedCity}
          setId={setCityId}
          setSelectMenuIsOpen={setSelectMenuIsOpen}
          {...props}
        />
      </label>
    </Animation>
  );
};

export default CitySelect;
