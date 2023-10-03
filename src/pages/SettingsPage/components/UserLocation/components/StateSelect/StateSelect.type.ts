import { Dispatch, SetStateAction } from "react";
import { CityType, StateType } from "../../UserLocation.type";

export type StateSelectProps = {
  stateList: StateType[];
  countryId: number;
  stateId: number;
  selectedState: string;
  setSelectedState: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCitiesList: Dispatch<SetStateAction<CityType[]>>;
  setCityId: Dispatch<SetStateAction<number>>;
  setStateId: Dispatch<SetStateAction<number>>;
};
