import {
  ChangeEvent,
  FC,
  useMemo,
  useState,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
} from "react";
import { GetCity } from "react-country-state-city";
import { CSSTransition } from "react-transition-group";

import { CityType, StateType } from "../../UserLocation.type";
import { StateSelectProps } from "./StateSelect.type";
import styles from "../../UserLocation.module.scss";

import Field from "../Field/Field";
import SelectMenu from "../SelectMenu/SelectMenu";

const StateSelect: FC<StateSelectProps> = ({
  stateList,
  countryId,
  stateId,
  selectedState,
  setSelectedState,
  setSelectedCity,
  setIsLoading,
  setCitiesList,
  setStateId,
  setCityId,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const stateRef = useRef(null);

  const filteredStates: StateType[] = useMemo(
    () =>
      stateList.filter((state: StateType) =>
        state.name.toLowerCase().includes(selectedState.toLowerCase())
      ),
    [stateList, selectedState]
  );

  useEffect(() => {
    const state = stateList.find((state) => state.id === stateId);
    state && setSelectedState(state.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateId, stateList]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuIsOpen(true);
    setCitiesList([]);
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCityId(0);
    setStateId(0);
  };

  const handleSelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSelectedCity("");
    setCitiesList([]);
    const id = +e.currentTarget.value;
    const state = filteredStates.find((state) => state.id === id);

    if (state) {
      setSelectedState(state.name);
      setStateId(state.id);
      setIsLoading(true);
      setMenuIsOpen(false);
      GetCity(countryId, state.id).then((result: CityType[]) => {
        setCitiesList(result);
        setIsLoading(false);
      });
    }
  };

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  const animation = !!countryId && !!(stateId || stateList.length);

  const transitionClassNames = {
    enter: styles["select-menu-enter"],
    enterActive: styles["select-menu-enter-active"],
    exit: styles["select-menu-exit"],
    exitActive: styles["select-menu-exit-active"],
  };

  return (
    <CSSTransition
      in={animation}
      nodeRef={stateRef}
      timeout={200}
      mountOnEnter
      unmountOnExit
      classNames={transitionClassNames}
    >
      <label ref={stateRef} className={styles["location-form__label"]}>
        <Field
          menuIsOpen={menuIsOpen}
          selectedValue={selectedState}
          toggleMenu={toggleMenu}
          handleChangeValue={handleChangeValue}
        />
        <SelectMenu
          menuIsOpen={menuIsOpen}
          filteredList={filteredStates}
          handleSelect={handleSelect}
        />
      </label>
    </CSSTransition>
  );
};

export default StateSelect;
