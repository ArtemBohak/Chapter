import { keyValue } from "@/src/utils";
import { Dispatch, SetStateAction } from "react";

export interface RestoreButtonProps {
  setRestoringProvider: Dispatch<
    SetStateAction<keyValue.GOOGLE | keyValue.EMAIL | "">
  >;
  setRestoringFormIsOpen: Dispatch<SetStateAction<boolean>>;
}
