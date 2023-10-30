import { FC, useState, FormEvent, useEffect, useRef } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { CSSTransition } from "react-transition-group";

import {
  CityType,
  CountriesType,
  StateType,
  UserLocationProps,
} from "./UserLocation.type";
import { ProfileUpdateApi } from "../../utils/ProfileUpdateApi";
import styles from "./UserLocation.module.scss";

import { Loader, UIbutton } from "@/src/components";
import CountrySelect from "./components/CountrySelect/CountrySelect";
import RegionSelect from "./components/RegionSelect/RegionSelect";
import CitySelect from "./components/CitySelect/CitySelect";

const UserLocation: FC<UserLocationProps> = ({ country, region, city }) => {
  const initialCountry = country ? +country : 0;
  const initialRegion = region ? +region : 0;
  const initialCity = city ? +city : 0;

  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [countryId, setCountryId] = useState(initialCountry);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryList, setCountryList] = useState<Array<CountriesType>>([]);

  const [regionId, setRegionId] = useState(initialRegion);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regionList, setRegionList] = useState<Array<StateType>>([]);

  const [cityId, setCityId] = useState(initialCity);
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesList, setCitiesList] = useState<Array<CityType>>([]);

  const nodeRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const countries = await GetCountries();
        setCountryList(countries);

        const state = await GetState(countryId);
        setRegionList(state);

        const city = await GetCity(countryId, regionId);
        setCitiesList(city);
      } finally {
        setInitialLoading(false);
      }
    })();
  }, [countryId, regionId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const profile = new ProfileUpdateApi(setIsLoading);

    await profile.userSave({
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

  const transitionTimeOut = 150;
  const buttonIsDisabled =
    isLoading ||
    (cityId === initialCity &&
      regionId === initialRegion &&
      countryId === initialCountry);

  const transitionClassNames = {
    enter: styles["select-menu-enter"],
    enterActive: styles["select-menu-enter-active"],
  };

  return (
    <>
      <Loader width={200} height={60} isShown={initialLoading} />
      <CSSTransition
        in={!initialLoading}
        nodeRef={nodeRef}
        timeout={transitionTimeOut}
        mountOnEnter
        classNames={transitionClassNames}
      >
        <form
          onSubmit={handleSubmit}
          className={styles["location-form"]}
          ref={nodeRef}
        >
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
      </CSSTransition>
    </>
  );
};

export default UserLocation;
