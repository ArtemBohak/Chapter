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

import { CountriesType, StateType } from "../../UserLocation.type";
import { CountrySelectProps } from "./CountrySelect.type";
import styles from "../../UserLocation.module.scss";

import Field from "../Field/Field";
import SelectMenu from "../SelectMenu/SelectMenu";

const CountrySelect: FC<CountrySelectProps> = ({
  setSelectedState,
  setSelectedCity,
  setCityId,
  setStateId,
  setIsLoading,
  setStateList,
  setSelectedCountry,
  setCitiesList,
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
    setStateList([]);
    setCitiesList([]);
    setCityId(0);
    setStateId(0);
  };

  const handleCountrySelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSelectedState("");
    setSelectedCity("");
    setStateList([]);
    setCitiesList([]);
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

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    <label className={styles["location-form__label"]}>
      <Field
        menuIsOpen={menuIsOpen}
        toggleMenu={toggleMenu}
        selectedValue={selectedCountry}
        icon={icon}
        handleChangeValue={handleChangeValue}
      />
      <SelectMenu
        menuIsOpen={menuIsOpen}
        filteredList={filteredCountries}
        handleSelect={handleCountrySelect}
      />
    </label>
  );
};

export default CountrySelect;
