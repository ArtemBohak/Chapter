import { FC, useState, FormEvent, useEffect, useRef } from "react";
import { GetCountries } from "react-country-state-city";

import {
  CityType,
  CountriesType,
  StateType,
  UserLocationProps,
} from "./UserLocation.type";
import { ProfileUpdateApi } from "../../utils/ProfileUpdateApi";
import styles from "./UserLocation.module.scss";

import { UIbutton } from "@/src/components";
import CountrySelect from "./components/CountrySelect/CountrySelect";
import RegionSelect from "./components/RegionSelect/RegionSelect";
import CitySelect from "./components/CitySelect/CitySelect";
import { useAppSelector } from "@/src/redux";

const UserLocation: FC<UserLocationProps> = ({ country, region, city }) => {
  const { location } = useAppSelector((state) => state.userSlice.user);
  const initialCountry = country ? +country : 0;
  const initialRegion = region ? +region : 0;
  const initialCity = city ? +city : 0;

  const [isLoading, setIsLoading] = useState(false);

  const [countryId, setCountryId] = useState(initialCountry);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryList, setCountryList] = useState<Array<CountriesType>>([]);
  const [icon, setIcon] = useState("");

  const [regionId, setRegionId] = useState(initialRegion);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regionList, setRegionList] = useState<Array<StateType>>([]);

  const [cityId, setCityId] = useState(initialCity);
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesList, setCitiesList] = useState<Array<CityType>>([]);

  const nodeRef = useRef(null);

  useEffect(() => {
    location && setSelectedCountry(location);
  }, [location]);

  useEffect(() => {
    (async () => {
      try {
        const countries = await GetCountries();
        setCountryList(countries);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [countryId, regionId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const profile = new ProfileUpdateApi(setIsLoading);

    const location = selectedCity
      ? selectedCity.concat(", ", selectedCountry)
      : selectedCountry;

    await profile.userSave({
      location,
    });
    setSelectedCountry(location);
    setCountryId(0);
    setIcon("");

    setRegionList([]);
    setSelectedRegion("");
    setRegionId(0);

    setCitiesList([]);
    setSelectedCity("");
    setCityId(0);
  };

  const transitionTimeOut = 150;
  const buttonIsDisabled =
    isLoading ||
    (cityId === initialCity &&
      regionId === initialRegion &&
      countryId === initialCountry);

  return (
    <form
      onSubmit={handleSubmit}
      className={styles["location-form"]}
      ref={nodeRef}
    >
      <CountrySelect
        icon={icon}
        selectedCountry={selectedCountry}
        countryList={countryList}
        countryId={countryId}
        setIcon={setIcon}
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
