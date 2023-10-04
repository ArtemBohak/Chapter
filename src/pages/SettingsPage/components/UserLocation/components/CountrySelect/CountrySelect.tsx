import { FC, useEffect, useState } from "react";

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

  useEffect(() => {
    const country = countryList.find((country) => country.id === countryId);
    if (country) {
      setIcon(country.emoji);
      setSelectedCountry(country.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryList, countryId]);

  return (
    <label className={styles["location-form__label"]}>
      <Field
        icon={icon}
        selectMenuIsOpen={menuIsOpen}
        selectedValue={selectedCountry}
        setSelectMenuIsOpen={setMenuIsOpen}
        setIcon={setIcon}
        setSelectedValue={setSelectedCountry}
        setId={setCountryId}
        setStateData={setStateList}
        setStateSelectedValue={setSelectedState}
        setStateId={setStateId}
        setCitiesData={setCitiesList}
        setCitySelectedValue={setSelectedCity}
        setCityId={setCityId}
      />
      <SelectMenu
        type="country"
        menuIsOpen={menuIsOpen}
        data={countryList}
        selectedValue={selectedCountry}
        setSelectedValue={setSelectedCountry}
        setId={setCountryId}
        setSelectMenuIsOpen={setMenuIsOpen}
        setIsLoading={setIsLoading}
        setIcon={setIcon}
        setSelectedState={setSelectedState}
        setStateData={setStateList}
        setSelectedCity={setSelectedCity}
        setCitiesData={setCitiesList}
      />
    </label>
  );
};

export default CountrySelect;
