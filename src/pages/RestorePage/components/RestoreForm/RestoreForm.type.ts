import { keyValue } from "@/src/utils";

export interface RestoringFormProps {
  restoringProvider: keyValue.GOOGLE | keyValue.EMAIL | undefined;
  email: string | undefined;
}
