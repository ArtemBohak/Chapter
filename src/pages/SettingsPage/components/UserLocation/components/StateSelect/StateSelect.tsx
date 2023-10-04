import { FC, useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { StateSelectProps } from "./StateSelect.type";
import styles from "../../UserLocation.module.scss";

import Field from "../Field/Field";
import SelectMenu from "../SelectMenu/SelectMenu";

const StateSelect: FC<StateSelectProps> = ({
  stateList,
  countryId,
  stateId,
  selectedState,
  transitionTimeOut,
  setSelectedState,
  setSelectedCity,
  setIsLoading,
  setCitiesList,
  setStateId,
  setCityId,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const stateRef = useRef(null);

  useEffect(() => {
    const state = stateList.find((state) => state.id === stateId);
    state && setSelectedState(state.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateId, stateList]);

  const isShowing =
    !!(countryId && stateList.length) || !!(stateList.length && stateId);

  const transitionClassNames = {
    enter: styles["select-menu-enter"],
    enterActive: styles["select-menu-enter-active"],
    exit: styles["select-menu-exit"],
    exitActive: styles["select-menu-exit-active"],
  };

  return (
    <CSSTransition
      in={isShowing}
      nodeRef={stateRef}
      timeout={transitionTimeOut}
      mountOnEnter
      unmountOnExit
      classNames={transitionClassNames}
    >
      <label ref={stateRef} className={styles["location-form__label"]}>
        <Field
          selectMenuIsOpen={menuIsOpen}
          selectedValue={selectedState}
          setSelectedValue={setSelectedState}
          setSelectMenuIsOpen={setMenuIsOpen}
          setId={setStateId}
          setCitiesData={setCitiesList}
          setCitySelectedValue={setSelectedCity}
          setCityId={setCityId}
        />
        <SelectMenu
          type="state"
          menuIsOpen={menuIsOpen}
          data={stateList}
          selectedValue={selectedState}
          setSelectedValue={setSelectedState}
          setId={setStateId}
          setSelectMenuIsOpen={setMenuIsOpen}
          setIsLoading={setIsLoading}
          countryId={countryId}
          setCitiesData={setCitiesList}
        />
      </label>
    </CSSTransition>
  );
};

export default StateSelect;
