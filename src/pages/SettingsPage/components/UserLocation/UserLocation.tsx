import { FC, useState, FormEvent, useEffect } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

import {
  CityType,
  CountriesType,
  StateType,
  UserLocationProps,
} from "./UserLocation.type";
import { ProfileUpdateApi } from "../../utils/ProfileUpdateApi";
import { useAppDispatch } from "@/src/redux";
import styles from "./UserLocation.module.scss";

import { UIbutton } from "@/src/components";
import CountrySelect from "./components/CountrySelect/CountrySelect";
import RegionSelect from "./components/RegionSelect/RegionSelect";
import CitySelect from "./components/CitySelect/CitySelect";

const UserLocation: FC<UserLocationProps> = ({ country, region, city }) => {
  const initialCountry = country ? +country : 0;
  const initialRegion = region ? +region : 0;
  const initialCity = city ? +city : 0;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [countryId, setCountryId] = useState(initialCountry);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryList, setCountryList] = useState<Array<CountriesType>>([]);

  const [regionId, setRegionId] = useState(initialRegion);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regionList, setRegionList] = useState<Array<StateType>>([]);

  const [cityId, setCityId] = useState(initialCity);
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesList, setCitiesList] = useState<Array<CityType>>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const countries = await GetCountries();
        setCountryList(countries);

        const state = await GetState(countryId);
        setRegionList(state);

        const city = await GetCity(countryId, regionId);
        setCitiesList(city);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [countryId, regionId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const profile = new ProfileUpdateApi(dispatch, setIsLoading);

    await profile.userLocationSave({
      country: countryId,
      region: regionId,
      city: cityId,
    });

    console.log({
      userLocation: selectedCity
        ? selectedCity.concat(", ", selectedCountry)
        : selectedCountry,
    });
  };

  const transitionTimeOut = 300;
  const buttonIsDisabled =
    isLoading ||
    !countryId ||
    (cityId === initialCity &&
      regionId === initialRegion &&
      countryId === initialCountry);

  return (
    <form onSubmit={handleSubmit} className={styles["location-form"]}>
      <CountrySelect
        selectedCountry={selectedCountry}
        countryList={countryList}
        countryId={countryId}
        setCountryId={setCountryId}
        setSelectedCountry={setSelectedCountry}
        setIsLoading={setIsLoading}
        setRegionList={setRegionList}
        setCitiesList={setCitiesList}
        setCountryList={setCountryList}
        setSelectedCity={setSelectedCity}
        setSelectedRegion={setSelectedRegion}
        setRegionId={setRegionId}
        setCityId={setCityId}
      />
      <RegionSelect
        regionList={regionList}
        countryId={countryId}
        regionId={regionId}
        selectedRegion={selectedRegion}
        transitionTimeOut={transitionTimeOut}
        setRegionId={setRegionId}
        setCityId={setCityId}
        setSelectedRegion={setSelectedRegion}
        setSelectedCity={setSelectedCity}
        setIsLoading={setIsLoading}
        setCitiesList={setCitiesList}
      />
      <CitySelect
        regionId={regionId}
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
