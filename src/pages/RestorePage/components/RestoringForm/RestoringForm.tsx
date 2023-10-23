import { FC } from "react";
import { RestoringFormProps } from "./RestoringForm.type";
import { keyValue } from "@/src/utils";

import RestoreEmail from "./components/RestoreEmail/RestoreEmail";
import RestoreGoogle from "./components/RestoreGoogle/RestoreGooge";

const RestoringForm: FC<RestoringFormProps> = ({ restoringProvider }) => {
  if (restoringProvider === keyValue.EMAIL) return <RestoreEmail />;

  if (restoringProvider === keyValue.GOOGLE) return <RestoreGoogle />;
};

export default RestoringForm;
