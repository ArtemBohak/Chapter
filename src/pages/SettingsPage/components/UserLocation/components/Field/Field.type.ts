import { Dispatch, SetStateAction } from "react";
import { CityType, StateType } from "../../UserLocation.type";

export type FieldProps = {
  selectMenuIsOpen: boolean;
  selectedValue: string;
  icon?: string;
  setSelectMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<number>>;
  setIcon?: Dispatch<SetStateAction<string>>;
  setRegionData?: Dispatch<SetStateAction<StateType[]>>;
  setRegionSelectedValue?: Dispatch<SetStateAction<string>>;
  setRegionId?: Dispatch<SetStateAction<number>>;
  setCitiesData?: Dispatch<SetStateAction<CityType[]>>;
  setCitySelectedValue?: Dispatch<SetStateAction<string>>;
  setCityId?: Dispatch<SetStateAction<number>>;
};
