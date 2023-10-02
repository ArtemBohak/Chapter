import { Dispatch, SetStateAction } from "react";
import { CityType } from "../../UserLocation.type";

export type CitySelectProps = {
  cityValue: string;
  citiesList: CityType[];
  setCityValue: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  cityId: number;
  setCityId: Dispatch<SetStateAction<number>>;
};
