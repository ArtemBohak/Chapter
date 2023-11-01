import { keysValue } from "@/src/types";

export interface RestoringFormProps {
  restoringProvider: keysValue.GOOGLE | keysValue.EMAIL | undefined;
  email: string | undefined;
}
