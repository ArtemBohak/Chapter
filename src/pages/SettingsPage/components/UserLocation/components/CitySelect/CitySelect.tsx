import {
  ChangeEvent,
  FC,
  useMemo,
  useState,
  MouseEvent,
  TouchEvent,
  useEffect,
} from "react";

import { CitySelectProps } from "./CitySelect.type";
import styles from "../../UserLocation.module.scss";
import { CityType } from "../../UserLocation.type";
import Field from "../Field/Field";
import SelectMenu from "../SelectMenu/SelectMenu";

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

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    <label className={styles["location-form__label"]}>
      <Field
        menuIsOpen={menuIsOpen}
        selectedValue={selectedCity}
        toggleMenu={toggleMenu}
        handleChangeValue={handleChangeValue}
      />
      <SelectMenu
        menuIsOpen={menuIsOpen}
        filteredList={filteredCities}
        handleSelect={handleSelect}
      />
    </label>
  );
};

export default CitySelect;
