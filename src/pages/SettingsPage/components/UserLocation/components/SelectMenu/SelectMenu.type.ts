import { MouseEvent, TouchEvent } from "react";
import { CityType, CountriesType, StateType } from "../../UserLocation.type";

export type SelectMenuProps = {
  menuIsOpen: boolean;
  filteredList: Array<CountriesType | StateType | CityType>;
  handleSelect: (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => void;
};
