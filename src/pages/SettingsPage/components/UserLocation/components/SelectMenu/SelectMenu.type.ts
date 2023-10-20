import { Dispatch, SetStateAction } from "react";
import { CityType, CountriesType, StateType } from "../../UserLocation.type";

export type SelectMenuProps = {
  menuIsOpen: boolean;
  data: Array<CountriesType | StateType | CityType>;
  selectedValue: string;
  countryId?: number;
  type?: "country" | "city" | "state";
  transitionTimeOut?: number;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<number>>;
  setSelectMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setIcon?: Dispatch<SetStateAction<string>>;
  setSelectedState?: Dispatch<SetStateAction<string>>;
  setStateData?: Dispatch<SetStateAction<StateType[]>>;
  setSelectedCity?: Dispatch<SetStateAction<string>>;
  setCitiesData?: Dispatch<SetStateAction<CityType[]>>;
};
