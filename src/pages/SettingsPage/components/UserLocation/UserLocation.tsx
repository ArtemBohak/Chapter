import { FC, useState, FormEvent, useEffect } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

import { CityType, CountriesType, StateType } from "./UserLocation.type";
import styles from "./UserLocation.module.scss";

import { UIbutton } from "@/src/components";
import CountrySelect from "./components/CountrySelect/CountrySelect";
import StateSelect from "./components/StateSelect/StateSelect";
import CitySelect from "./components/CitySelect/CitySelect";

const initialValues = {
  countryId: 230,
  stateId: 4676,
  cityId: 109897,
};

const UserLocation: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [countryId, setCountryId] = useState(initialValues.countryId);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryList, setCountryList] = useState<Array<CountriesType>>([]);

  const [stateId, setStateId] = useState(initialValues.stateId);
  const [selectedState, setSelectedState] = useState("");
  const [stateList, setStateList] = useState<Array<StateType>>([]);

  const [cityId, setCityId] = useState(initialValues.cityId);
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesList, setCitiesList] = useState<Array<CityType>>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const countries = await GetCountries();
        setCountryList(countries);

        const state = await GetState(countryId);
        setStateList(state);

        const city = await GetCity(countryId, stateId);
        setCitiesList(city);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [countryId, stateId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userLocation = [selectedCountry];
      selectedCity && userLocation.unshift(selectedCity);
      setTimeout(() => {
        console.log({
          countryId,
          stateId,
          cityId,
          userLocation,
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
  const buttonIsDisabled =
    isLoading ||
    !countryId ||
    (cityId === initialValues.cityId &&
      stateId === initialValues.stateId &&
      countryId === initialValues.countryId);

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
        transitionTimeOut={transitionTimeOut}
        setStateId={setStateId}
        setCityId={setCityId}
        setSelectedState={setSelectedState}
        setSelectedCity={setSelectedCity}
        setIsLoading={setIsLoading}
        setCitiesList={setCitiesList}
      />
      <CitySelect
        stateId={stateId}
        citiesList={citiesList}
        cityId={cityId}
        selectedCity={selectedCity}
        transitionTimeOut={transitionTimeOut}
        setSelectedCity={setSelectedCity}
        setCityId={setCityId}
      />

      <UIbutton
        className={`${styles["location-form__button"]} ${styles["button"]}`}
        dataAutomation="submitButton"
        isLoading={isLoading}
        disabled={buttonIsDisabled}
        type="submit"
      >
        Save changes
      </UIbutton>
    </form>
  );
};

export default UserLocation;
