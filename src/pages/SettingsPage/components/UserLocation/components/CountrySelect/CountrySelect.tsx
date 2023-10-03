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
  setCityId,
  setStateId,
  setIsLoading,
  setStateList,
  setSelectedCountry,
  setCountryId,
  countryId,
  countryList,
  selectedCountry,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [icon, setIcon] = useState("");

  const filteredCountries: CountriesType[] = useMemo(
    () =>
      countryList.filter((country: CountriesType) =>
        country.name.toLowerCase().includes(selectedCountry.toLowerCase())
      ),
    [countryList, selectedCountry]
  );

  useEffect(() => {
    const country = countryList.find((country) => country.id === countryId);
    if (country) {
      setIcon(country.emoji);
      setSelectedCountry(country.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryList, countryId]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuIsOpen(true);
    setSelectedCountry(e.target.value);
    setIcon("");
    setSelectedState("");
    setSelectedCity("");
    setCityId(0);
    setStateId(0);
  };

  const handleCountrySelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    console.log(1);
    setSelectedState("");
    setSelectedCity("");
    const id = +e.currentTarget.value;
    const country = filteredCountries.find((country) => country.id === id);
    if (country) {
      setCountryId(country.id);
      setIcon(country.emoji);
      setSelectedCountry(country.name);
      setIsLoading(true);
      setMenuIsOpen(false);
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
          value={selectedCountry}
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
          <span className={arrowClassNames}></span>
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
