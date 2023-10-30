import { FC, useEffect, useRef, useState } from "react";

import { useOutsideClick } from "@/src/hooks";
import { CountrySelectProps } from "./CountrySelect.type";
import styles from "../../UserLocation.module.scss";

import Field from "../Field/Field";
import SelectMenu from "../SelectMenu/SelectMenu";

const CountrySelect: FC<CountrySelectProps> = ({
  setSelectedRegion,
  setSelectedCity,
  setCityId,
  setRegionId,
  setIsLoading,
  setRegionList,
  setSelectedCountry,
  setCitiesList,
  setCountryId,
  countryId,
  countryList,
  selectedCountry,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [icon, setIcon] = useState("");
  const countryRef = useRef(null);

  useOutsideClick(countryRef, setMenuIsOpen);

  useEffect(() => {
    const country = countryList.find((country) => country.id === countryId);
    if (country) {
      setIcon(country.emoji);
      setSelectedCountry(country.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryList, countryId]);

  return (
    <label className={styles["location-form__label"]} ref={countryRef}>
      <Field
        icon={icon}
        selectMenuIsOpen={menuIsOpen}
        selectedValue={selectedCountry}
        setSelectMenuIsOpen={setMenuIsOpen}
        setIcon={setIcon}
        setSelectedValue={setSelectedCountry}
        setId={setCountryId}
        setRegionData={setRegionList}
        setRegionSelectedValue={setSelectedRegion}
        setRegionId={setRegionId}
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
        setSelectedRegion={setSelectedRegion}
        setRegionData={setRegionList}
        setSelectedCity={setSelectedCity}
        setCitiesData={setCitiesList}
      />
    </label>
  );
};

export default CountrySelect;
