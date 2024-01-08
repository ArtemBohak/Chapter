import { keysValue } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export interface RestoringFormProps {
  restoringProvider: keysValue.GOOGLE | keysValue.EMAIL | undefined;
  email: string | undefined;
  setShowError: Dispatch<SetStateAction<boolean>>;
}
