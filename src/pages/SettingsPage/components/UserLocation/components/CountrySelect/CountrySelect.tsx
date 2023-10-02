import {
  FC,
  useEffect,
  MouseEvent,
  TouchEvent,
  ChangeEvent,
  useMemo,
  useState,
} from "react";
import { GetState } from "react-country-state-city";
import cn from "classnames";

import { CountriesType } from "../../UserLocation.type";
import { CountrySelectProps } from "./CountrySelect.type";
import { StateType } from "../../UserLocation.type";
import styles from "../../UserLocation.module.scss";

const CountrySelect: FC<CountrySelectProps> = ({
  setSelectedState,
  setSelectedCity,
  setStateValue,
  setCityId,
  setStateId,
  setCityValue,
  setIsLoading,
  setStateList,
  setSelectedCountry,
  setCountryValue,
  setId,
  setIcon,
  id,
  countryList,
  countryValue,
  icon,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const filteredCountries: CountriesType[] = useMemo(
    () =>
      countryList.filter((item: CountriesType) =>
        item.name.toLowerCase().includes(countryValue.toLowerCase())
      ),
    [countryList, countryValue]
  );

  useEffect(() => {
    const country = countryList.find((item) => item.id === id);
    if (country) {
      setIcon(country.emoji);
      setSelectedCountry(country.name);
      setCountryValue(country.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryList, id]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryValue(e.target.value);
    setSelectedCountry("");
    setIcon("");
    setSelectedState("");
    setSelectedCity("");
    setCityId(0);
    setStateId(0);
  };

  const handleCountrySelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSelectedState("");
    setStateValue("");
    setSelectedCity("");
    setCityValue("");
    const index = +e.currentTarget.value;
    const country = filteredCountries.find((item) => item.id === index);
    if (country) {
      setId(country.id);
      setIcon(country.emoji);
      setSelectedCountry(country.name);
      setCountryValue(country.name);
      setMenuIsOpen(false);
      setIsLoading(true);

      GetState(country.id).then((result: StateType[]) => {
        setStateList(result);
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
        <span className={styles["icon"]}>{icon}</span>
        <input
          className={styles["flag"]}
          type="text"
          name="country"
          value={countryValue}
          onChange={handleChangeValue}
          onBlur={() => setMenuIsOpen(false)}
          data-automation="countryInput"
        />
        <button
          className={styles["arrow-btn"]}
          type="button"
          data-automation="clickButton"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <span className={arrowClassNames} />
        </button>
      </span>
      {menuIsOpen && (
        <span className={styles["strop-down-menu-container"]}>
          {filteredCountries.map(
            ({ id, name, emoji }: Partial<CountriesType>) => (
              <button
                type="button"
                key={id}
                value={id}
                data-automation="clickButton"
                onClick={handleCountrySelect}
              >
                <span>{emoji}</span>
                <span>{name}</span>
              </button>
            )
          )}
        </span>
      )}
    </label>
  );
};

export default CountrySelect;
