import { Dispatch, SetStateAction } from "react";
import { CityType, StateType } from "../../UserLocation.type";

export type StateSelectProps = {
  stateList: StateType[];
  stateValue: string;
  id: number;
  setStateValue: Dispatch<SetStateAction<string>>;
  setSelectedState: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setCityValue: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCitiesList: Dispatch<SetStateAction<CityType[]>>;
  setCityId: Dispatch<SetStateAction<number>>;
  stateId: number;
  setStateId: Dispatch<SetStateAction<number>>;
};
