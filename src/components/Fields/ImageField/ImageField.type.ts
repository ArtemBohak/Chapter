import { Dispatch, SetStateAction } from "react";

export type ImageFieldProps = {
  setImage?: Dispatch<SetStateAction<string>>;
  id?: number | string;
  btnVariant: "button" | "icon";
  imageType: "avatar" | "post";
  iconSize?: number;
  classNames?: string;
};
