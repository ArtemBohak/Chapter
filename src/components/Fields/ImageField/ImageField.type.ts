import { Dispatch, SetStateAction } from "react";

export type ImageFieldProps = {
  btnVariant: "button" | "icon";
  setFile: Dispatch<SetStateAction<File | null>>;
  setImage?: Dispatch<SetStateAction<string>>;
  iconSize?: number;
  classNames?: string;
  isLoading?: boolean;
  error?: string | null;
};
