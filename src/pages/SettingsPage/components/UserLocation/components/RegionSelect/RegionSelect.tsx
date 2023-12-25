import { FC, useState, useEffect, useRef } from "react";

import { useOutsideClick } from "@/src/hooks";
import { StateSelectProps } from "./RegionSelect.type";
import styles from "../../UserLocation.module.scss";

import Field from "../Field/Field";
import SelectMenu from "../SelectMenu/SelectMenu";
import { Animation } from "@/src/components";

const StateSelect: FC<StateSelectProps> = ({
  regionList,
  countryId,
  regionId,
  selectedRegion,
  transitionTimeOut,
  setSelectedRegion,
  setRegionId,
  ...props
}) => {
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
  const stateRef = useRef(null);
  useOutsideClick(stateRef, setSelectMenuIsOpen);

  useEffect(() => {
    const state = regionList.find((state) => state.id === regionId);
    state && setSelectedRegion(state.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId, regionList]);

  const isShowing =
    !!(countryId && regionList.length) || !!(regionList.length && regionId);

  const transitionClassNames = {
    enter: styles["select-menu-enter"],
    enterActive: styles["select-menu-enter-active"],
    exit: styles["select-menu-exit"],
    exitActive: styles["select-menu-exit-active"],
  };

  return (
    <Animation
      in={isShowing}
      nodeRef={stateRef}
      timeout={transitionTimeOut}
      mountOnEnter
      unmountOnExit
      classNames={transitionClassNames}
    >
      <label ref={stateRef} className={styles["location-form__label"]}>
        <Field
          selectMenuIsOpen={selectMenuIsOpen}
          selectedValue={selectedRegion}
          setSelectedValue={setSelectedRegion}
          setSelectMenuIsOpen={setSelectMenuIsOpen}
          setId={setRegionId}
          label="Region"
          {...props}
        />
        <SelectMenu
          type="state"
          selectMenuIsOpen={selectMenuIsOpen}
          data={regionList}
          selectedValue={selectedRegion}
          setSelectedValue={setSelectedRegion}
          setId={setRegionId}
          setSelectMenuIsOpen={setSelectMenuIsOpen}
          countryId={countryId}
          {...props}
        />
      </label>
    </Animation>
  );
};

export default StateSelect;
