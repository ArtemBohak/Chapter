import { ChangeEvent } from "react";

export type FieldProps = {
  icon?: string;
  menuIsOpen: boolean;
  selectedValue: string;
  toggleMenu: () => void;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
};
