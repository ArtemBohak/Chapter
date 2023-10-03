import { FC, useState, FormEvent, useEffect } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

import { CityType, CountriesType, StateType } from "./UserLocation.type";
import styles from "./UserLocation.module.scss";

import { UIbutton } from "@/src/components";
import CountrySelect from "./components/CountrySelect/CountrySelect";
import StateSelect from "./components/StateSelect/StateSelect";
import CitySelect from "./components/CitySelect/CitySelect";

const initialValues = {
  countryId: 0,
  stateId: 0,
  cityId: 0,
};

const UserLocation: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [countryId, setCountryId] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryList, setCountryList] = useState<Array<CountriesType>>([]);

  const [stateId, setStateId] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [stateList, setStateList] = useState<Array<StateType>>([]);

  const [cityId, setCityId] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesList, setCitiesList] = useState<Array<CityType>>([]);

  useEffect(() => {
    setCountryId(initialValues.countryId);
    setStateId(initialValues.stateId);
    setCityId(initialValues.cityId);
  }, []);

  useEffect(() => {
    GetCountries().then((countries: CountriesType[]) => {
      setCountryList(countries);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    GetState(countryId).then((states: StateType[]) => {
      setStateList(states);
      setIsLoading(false);
    });
  }, [countryId]);

  useEffect(() => {
    setIsLoading(true);
    GetCity(countryId, stateId).then((cities: CityType[]) => {
      setCitiesList(cities);
      setIsLoading(false);
    });
  }, [countryId, stateId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(() => {
        console.log({
          countryId,
          stateId,
          cityId,
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };
  const transitionTimeOut = 300;
  const buttonIsDisabled = isLoading;
  return (
    <form onSubmit={handleSubmit} className={styles["location-form"]}>
      <CountrySelect
        selectedCountry={selectedCountry}
        countryList={countryList}
        countryId={countryId}
        setCountryId={setCountryId}
        setSelectedCountry={setSelectedCountry}
        setIsLoading={setIsLoading}
        setStateList={setStateList}
        setCitiesList={setCitiesList}
        setCountryList={setCountryList}
        setSelectedCity={setSelectedCity}
        setSelectedState={setSelectedState}
        setStateId={setStateId}
        setCityId={setCityId}
      />
      <StateSelect
        stateList={stateList}
        countryId={countryId}
        stateId={stateId}
        selectedState={selectedState}
        setStateId={setStateId}
        setCityId={setCityId}
        setSelectedState={setSelectedState}
        setSelectedCity={setSelectedCity}
        setIsLoading={setIsLoading}
        setCitiesList={setCitiesList}
        transitionTimeOut={transitionTimeOut}
      />
      <CitySelect
        stateId={stateId}
        citiesList={citiesList}
        cityId={cityId}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setCityId={setCityId}
        transitionTimeOut={transitionTimeOut}
      />

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
