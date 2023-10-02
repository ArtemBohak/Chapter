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
  stateValue,
  id,
  stateId,
  setStateValue,
  setSelectedState,
  setSelectedCity,
  setCityValue,
  setIsLoading,
  setCitiesList,
  setStateId,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const filteredStates: StateType[] = useMemo(
    () =>
      stateList.filter((item: StateType) =>
        item.name.toLowerCase().includes(stateValue.toLowerCase())
      ),
    [stateList, stateValue]
  );

  useEffect(() => {
    const state = stateList.find((item) => item.id === stateId);
    if (state) {
      setSelectedState(state.name);
      setStateValue(state.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateId, stateList]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setStateValue(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleSelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setCityValue("");
    setSelectedCity("");
    const index = +e.currentTarget.value;
    const state = filteredStates.find((item) => item.id === index);

    if (state) {
      setSelectedState(state.name);
      setStateValue(state.name);
      setStateId(state.id);
      setMenuIsOpen(false);
      setIsLoading(true);
      GetCity(id, state.id).then((result: CityType[]) => {
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
          value={stateValue}
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
            <span className={arrowClassNames} />
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
