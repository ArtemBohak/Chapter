import { FC } from "react";
import { RestoringFormProps } from "./RestoringForm.type";
import RestoreEmail from "./components/RestoreEmail/RestoreEmail";
import { keyValue } from "@/src/utils";

const RestoringForm: FC<RestoringFormProps> = ({ restoringProvider }) => {
  if (restoringProvider === keyValue.EMAIL) return <RestoreEmail />;

  if (restoringProvider === keyValue.GOOGLE) return <p>google</p>;
};

export default RestoringForm;
