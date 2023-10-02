import { FC, useState, FormEvent, useEffect } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
// import { CSSTransition } from "react-transition-group";

import { CityType, CountriesType, StateType } from "./UserLocation.type";

import styles from "./UserLocation.module.scss";

import { UIbutton } from "@/src/components";
import CountrySelect from "./components/CountrySelect/CountrySelect";
import StateSelect from "./components/StateSelect/StateSelect";
import CitySelect from "./components/CitySelect/CitySelect";

const initialValues = {
  countryId: 1,
  stateId: 3901,
  cityId: 52,
};

const UserLocation: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [icon, setIcon] = useState("");
  const [countryList, setCountryList] = useState<Array<CountriesType>>([]);

  const [stateId, setStateId] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [stateList, setStateList] = useState<Array<StateType>>([]);

  const [cityId, setCityId] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [citiesList, setCitiesList] = useState<Array<CityType>>([]);

  useEffect(() => {
    setId(initialValues.countryId);
    setStateId(initialValues.stateId);
    setCityId(initialValues.cityId);
  }, []);

  useEffect(() => {
    GetCountries().then((countries: CountriesType[]) => {
      setCountryList(countries);
    });
  }, []);

  useEffect(() => {
    GetState(id).then((states: StateType[]) => {
      setStateList(states);
    });
  }, [id]);

  useEffect(() => {
    GetCity(id, stateId).then((cities: CityType[]) => {
      setCitiesList(cities);
    });
  }, [id, stateId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(() => {
        console.log({
          icon,
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

  const buttonIsDisabled =
    isLoading ||
    !selectedCountry ||
    selectedCountry !== countryValue ||
    (stateList.length > 0 && !selectedState) ||
    (citiesList.length > 0 && !selectedCity);
  return (
    <form onSubmit={handleSubmit} className={styles["location-form"]}>
      <CountrySelect
        countryValue={countryValue}
        icon={icon}
        countryList={countryList}
        setId={setId}
        setIcon={setIcon}
        setCountryValue={setCountryValue}
        setSelectedCountry={setSelectedCountry}
        setCityValue={setCityValue}
        setIsLoading={setIsLoading}
        setStateList={setStateList}
        setCountryList={setCountryList}
        setStateValue={setStateValue}
        setSelectedCity={setSelectedCity}
        setSelectedState={setSelectedState}
        id={id}
      />
      {selectedCountry && (selectedState || stateList.length) ? (
        <StateSelect
          stateList={stateList}
          stateValue={stateValue}
          id={id}
          stateId={stateId}
          setStateId={setStateId}
          setStateValue={setStateValue}
          setSelectedState={setSelectedState}
          setSelectedCity={setSelectedCity}
          setCityValue={setCityValue}
          setIsLoading={setIsLoading}
          setCitiesList={setCitiesList}
        />
      ) : null}
      {selectedState && (selectedCity || citiesList.length) ? (
        <CitySelect
          cityValue={cityValue}
          citiesList={citiesList}
          setCityValue={setCityValue}
          setSelectedCity={setSelectedCity}
          cityId={cityId}
          setCityId={setCityId}
        />
      ) : null}
      <UIbutton
        className={`${styles["location-form__button"]} ${styles["button"]}`}
        dataAutomation="submitButton"
        isLoading={isLoading}
        disabled={buttonIsDisabled}
        type="submit"
      >
        Save
      </UIbutton>
    </form>
  );
};

export default UserLocation;
