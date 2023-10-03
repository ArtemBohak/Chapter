import {
  ChangeEvent,
  FC,
  useMemo,
  useState,
  MouseEvent,
  TouchEvent,
  useEffect,
} from "react";
import cn from "classnames";

import { CitySelectProps } from "./CitySelect.type";
import styles from "../../UserLocation.module.scss";
import { CityType } from "../../UserLocation.type";

const CitySelect: FC<CitySelectProps> = ({
  citiesList,
  cityId,
  selectedCity,
  setCityId,
  setSelectedCity,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const filteredCities: CityType[] = useMemo(
    () =>
      citiesList.filter((city) =>
        city.name.toLowerCase().includes(selectedCity.toLowerCase())
      ),
    [citiesList, selectedCity]
  );

  useEffect(() => {
    const city = citiesList.find((item) => item.id === cityId);

    city && setSelectedCity(city.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesList, cityId]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuIsOpen(true);
    setSelectedCity(e.target.value);
    setCityId(0);
  };

  const handleSelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    const id = +e.currentTarget.value;
    const city = filteredCities.find((city) => city.id === id);
    if (city) {
      setSelectedCity(city.name);
      setCityId(city.id);
      setMenuIsOpen(false);
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
          name="city"
          value={selectedCity}
          data-automation="cityInput"
          onChange={handleChangeValue}
        />
        {filteredCities.length ? (
          <button
            className={styles["arrow-btn"]}
            data-automation="clickButton"
            type="button"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <span className={arrowClassNames}></span>
          </button>
        ) : null}
      </span>
      {menuIsOpen && (
        <span className={styles["strop-down-menu-container"]}>
          {filteredCities.map(({ id, name }) => (
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

export default CitySelect;
