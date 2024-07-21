import { Dispatch, SetStateAction } from "react";
import { CityType, CountriesType, StateType } from "../../UserLocation.type";

export type CountrySelectProps = {
  countryList: CountriesType[];
  selectedCountry: string;
  countryId: number;
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setRegionList: Dispatch<SetStateAction<StateType[]>>;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  setCountryId: Dispatch<SetStateAction<number>>;
  setCityId: Dispatch<SetStateAction<number>>;
  setCountryList: Dispatch<SetStateAction<CountriesType[]>>;
  setCitiesList: Dispatch<SetStateAction<CityType[]>>;
  setRegionId: Dispatch<SetStateAction<number>>;
};
