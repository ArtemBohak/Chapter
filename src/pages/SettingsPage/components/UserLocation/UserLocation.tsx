import {
  FC,
  useEffect,
  useState,
  MouseEvent,
  TouchEvent,
  ChangeEvent,
  useMemo,
  FormEvent,
} from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import cn from "classnames";

import { CityType, CountriesType, StateType } from "./UserLocation.type";
import styles from "./UserLocation.module.scss";
import { UIbutton } from "@/src/components";

const UserLocation: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [countryId, setCountryId] = useState(0);
  const [countryValue, setCountryValue] = useState("");
  const [countryIcon, setCountryIcon] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countriesList, setCountriesList] = useState<Array<CountriesType>>([]);
  const [countryMenuIsOpen, setCountryMenuIsOpen] = useState(false);

  const [stateValue, setStateValue] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateList, setStateList] = useState<Array<StateType>>([]);
  const [stateMenuIsOpen, setStateMenuIsOpen] = useState(false);

  const [cityValue, setCityValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesList, setCitiesList] = useState<Array<CityType>>([]);
  const [cityMenuIsOpen, setCityMenuIsOpen] = useState(false);

  const filteredCountries = useMemo(
    () =>
      countriesList.filter((item) =>
        item.name.toLowerCase().includes(countryValue.toLowerCase())
      ),
    [countriesList, countryValue]
  );

  const filteredStates = useMemo(
    () =>
      stateList.filter((item) =>
        item.name.toLowerCase().includes(stateValue.toLowerCase())
      ),
    [stateList, stateValue]
  );

  const filteredCities = useMemo(
    () =>
      citiesList.filter((item) =>
        item.name.toLowerCase().includes(cityValue.toLowerCase())
      ),
    [citiesList, cityValue]
  );

  useEffect(() => {
    GetCountries().then((result: CountriesType[]) => setCountriesList(result));
  }, []);

  const handleChangeCountryValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryValue(e.target.value);
    setCountryIcon("");
  };

  const handleChangeStateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setStateValue(e.target.value);
    setSelectedState("");
  };

  const handleChangeCityValue = (e: ChangeEvent<HTMLInputElement>) => {
    setStateValue(e.target.value);
    setSelectedState("");
  };

  const handleCountrySelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setStateValue("");
    setSelectedState("");
    const index = +e.currentTarget.value;
    const country = filteredCountries.find((item) => item.id === index);
    if (country) {
      setCountryIcon(country.emoji);
      setCountryValue(country.name);
      setSelectedCountry(country.name);
      setCountryId(country.id);
      setCountryMenuIsOpen(false);

      GetState(country.id).then((result: StateType[]) => setStateList(result));
    }
  };

  const handleStateSelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    const index = +e.currentTarget.value;
    const state = filteredStates.find((item) => item.id === index);

    if (state) {
      setStateValue(state.name);
      setSelectedState(state.name);
      setStateMenuIsOpen(false);

      GetCity(countryId, state.id).then((result: CityType[]) =>
        setCitiesList(result)
      );
    }
  };

  const handleCitySelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    const index = +e.currentTarget.value;
    const city = filteredCities.find((item) => item.id === index);
    if (city) {
      setCityValue(city.name);
      setSelectedCity(city.name);
      setCityMenuIsOpen(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(() => {
        console.log({
          countryIcon,
          selectedCountry,
          selectedState,
          selectedCity,
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  const countriesArrowClassNames = cn(styles["arrow"], {
    [styles["arrow--down"]]: !countryMenuIsOpen,
    [styles["arrow--up"]]: countryMenuIsOpen,
  });

  const statesArrowClassNames = cn(styles["arrow"], {
    [styles["arrow--down"]]: !stateMenuIsOpen,
    [styles["arrow--up"]]: stateMenuIsOpen,
  });

  const citiesArrowClassNames = cn(styles["arrow"], {
    [styles["arrow--down"]]: !cityMenuIsOpen,
    [styles["arrow--up"]]: cityMenuIsOpen,
  });
  return (
    <form onSubmit={handleSubmit} className={styles["location-form"]}>
      <label className={styles["location-form__label"]}>
        <span className={styles["strop-down-container"]}>
          <span className={styles["icon"]}>{countryIcon}</span>
          <input
            className={styles["flag"]}
            type="text"
            name="country"
            value={countryValue}
            onChange={handleChangeCountryValue}
            data-automation="countryInput"
          />
          <button
            className={styles["arrow-btn"]}
            type="button"
            data-automation="clickButton"
            onClick={() => setCountryMenuIsOpen(!countryMenuIsOpen)}
          >
            <span className={countriesArrowClassNames} />
          </button>
        </span>
        {countryMenuIsOpen && (
          <span className={styles["strop-down-menu-container"]}>
            {filteredCountries.map(({ id, name, emoji }) => (
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
            ))}
          </span>
        )}
      </label>
      {selectedCountry ? (
        <label className={styles["location-form__label"]}>
          <span className={styles["strop-down-container"]}>
            <input
              type="text"
              name="state"
              value={stateValue}
              data-automation="stateInput"
              onChange={handleChangeStateValue}
            />
            <button
              className={styles["arrow-btn"]}
              type="button"
              data-automation="clickButton"
              onClick={() => setStateMenuIsOpen(!stateMenuIsOpen)}
            >
              <span className={statesArrowClassNames} />
            </button>
          </span>
          {stateMenuIsOpen && (
            <span className={styles["strop-down-menu-container"]}>
              {filteredStates.map(({ id, name }) => (
                <button
                  type="button"
                  data-automation="clickButton"
                  key={id}
                  value={id}
                  onClick={handleStateSelect}
                >
                  <span>{name}</span>
                </button>
              ))}
            </span>
          )}
        </label>
      ) : null}
      {selectedState ? (
        <label className={styles["location-form__label"]}>
          <span className={styles["strop-down-container"]}>
            <input
              type="text"
              name="city"
              value={cityValue}
              data-automation="cityInput"
              onChange={handleChangeCityValue}
            />
            <button
              className={styles["arrow-btn"]}
              data-automation="clickButton"
              type="button"
              onClick={() => setCityMenuIsOpen(!cityMenuIsOpen)}
            >
              <span className={citiesArrowClassNames} />
            </button>
          </span>
          {cityMenuIsOpen && (
            <span className={styles["strop-down-menu-container"]}>
              {filteredCities.map(({ id, name }) => (
                <button
                  type="button"
                  data-automation="clickButton"
                  key={id}
                  value={id}
                  onClick={handleCitySelect}
                >
                  <span>{name}</span>
                </button>
              ))}
            </span>
          )}
        </label>
      ) : null}
      <UIbutton
        className={`${styles["location-form__button"]} ${styles["button"]}`}
        dataAutomation="submitButton"
        isLoading={isLoading}
        disabled={isLoading || !selectedCountry || !selectedCity}
        type="submit"
      >
        Save
      </UIbutton>
    </form>
  );
};

export default UserLocation;
