import { Dispatch, SetStateAction } from "react";
import { CityType } from "../../UserLocation.type";

export type CitySelectProps = {
  selectedCity: string;
  citiesList: CityType[];
  cityId: number;
  regionId: number;
  transitionTimeOut: number;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setCityId: Dispatch<SetStateAction<number>>;
};
