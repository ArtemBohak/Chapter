import { Dispatch, SetStateAction } from "react";

export type NameFormProps = {
  fullName: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  classNames?: string;
};

export interface INameForm {
  fullName: string;
}
