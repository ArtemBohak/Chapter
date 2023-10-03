import {
  ChangeEvent,
  FC,
  useMemo,
  useState,
  MouseEvent,
  TouchEvent,
  useEffect,
} from "react";
import { GetCity } from "react-country-state-city";
import cn from "classnames";

import { CityType, StateType } from "../../UserLocation.type";
import { StateSelectProps } from "./StateSelect.type";
import styles from "../../UserLocation.module.scss";

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
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCityId(0);
    setStateId(0);
  };

  const handleSelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSelectedCity("");
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

  const arrowClassNames = cn(styles["arrow"], {
    [styles["arrow--down"]]: !menuIsOpen,
    [styles["arrow--up"]]: menuIsOpen,
  });

  return (
    <label className={styles["location-form__label"]}>
      <span className={styles["strop-down-container"]}>
        <input
          type="text"
          name="state"
          value={selectedState}
          data-automation="stateInput"
          onChange={handleChangeValue}
        />
        {filteredStates.length ? (
          <button
            className={styles["arrow-btn"]}
            type="button"
            data-automation="clickButton"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <span className={arrowClassNames}></span>
          </button>
        ) : null}
      </span>
      {menuIsOpen && (
        <span className={styles["strop-down-menu-container"]}>
          {filteredStates.map(({ id, name }) => (
            <button
              type="button"
              data-automation="clickButton"
              key={id}
              value={id}
              onClick={handleSelect}
            >
              <span>{name}</span>
            </button>
          ))}
        </span>
      )}
    </label>
  );
};

export default StateSelect;
