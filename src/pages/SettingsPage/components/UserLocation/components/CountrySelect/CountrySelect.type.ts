import { Dispatch, SetStateAction } from "react";
import { CountriesType, StateType } from "../../UserLocation.type";

export type CountrySelectProps = {
  setSelectedState: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setStateList: Dispatch<SetStateAction<StateType[]>>;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  setCountryId: Dispatch<SetStateAction<number>>;
  setCityId: Dispatch<SetStateAction<number>>;
  setCountryList: Dispatch<SetStateAction<CountriesType[]>>;
  setStateId: Dispatch<SetStateAction<number>>;
  countryList: CountriesType[];
  selectedCountry: string;
  countryId: number;
};
