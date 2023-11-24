import { FC, useEffect, useRef, useState } from "react";

import { useOutsideClick } from "@/src/hooks";
import { CountrySelectProps } from "./CountrySelect.type";
import styles from "../../UserLocation.module.scss";

import Field from "../Field/Field";
import SelectMenu from "../SelectMenu/SelectMenu";
import { useAppSelector } from "@/src/redux";

const CountrySelect: FC<CountrySelectProps> = ({
  setSelectedCountry,
  setCountryId,
  setIcon,
  countryId,
  countryList,
  selectedCountry,
  ...props
}) => {
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);

  const countryRef = useRef(null);
  const { location } = useAppSelector((state) => state.userSlice.user);

  useOutsideClick(countryRef, setSelectMenuIsOpen);

  useEffect(() => {
    const country = countryList.find((country) => country.id === countryId);
    if (country) {
      setIcon(country.emoji);
      setSelectedCountry(country.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryList, countryId]);

  useEffect(() => {
    if (!selectMenuIsOpen && !selectedCountry) {
      setSelectedCountry(location || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, selectMenuIsOpen, selectedCountry]);

  return (
    <label className={styles["location-form__label"]} ref={countryRef}>
      <Field
        selectMenuIsOpen={selectMenuIsOpen}
        selectedValue={selectedCountry}
        setSelectMenuIsOpen={setSelectMenuIsOpen}
        setIcon={setIcon}
        setSelectedValue={setSelectedCountry}
        setId={setCountryId}
        {...props}
      />
      <SelectMenu
        type="country"
        selectMenuIsOpen={selectMenuIsOpen}
        data={countryList}
        selectedValue={selectedCountry}
        setSelectedValue={setSelectedCountry}
        setId={setCountryId}
        setSelectMenuIsOpen={setSelectMenuIsOpen}
        setIcon={setIcon}
        {...props}
      />
    </label>
  );
};

export default CountrySelect;
