import { Dispatch, SetStateAction } from "react";
import { type Data } from "./types";

export type SocialModalProps = {
  title: string;
  data: Data;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
