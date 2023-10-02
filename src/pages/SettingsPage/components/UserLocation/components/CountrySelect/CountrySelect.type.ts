import { Dispatch, SetStateAction } from "react";
import { CountriesType, StateType } from "../../UserLocation.type";

export type CountrySelectProps = {
  setSelectedState: Dispatch<SetStateAction<string>>;
  setStateValue: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setCityValue: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setStateList: Dispatch<SetStateAction<StateType[]>>;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<number>>;
  countryValue: string;
  setCountryValue: Dispatch<SetStateAction<string>>;
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
  countryList: CountriesType[];
  setCountryList: Dispatch<SetStateAction<CountriesType[]>>;
  id: number;
};
