import { FC } from "react";

import { RestoringFormProps } from "./RestoreForm.type";
import { keyValue } from "@/src/utils";
import styles from "./RestoreForm.module.scss";

import RestoreEmail from "./components/RestoreEmail/RestoreEmail";
import RestoreGoogle from "./components/RestoreGoogle/RestoreGooge";

const RestoreForm: FC<RestoringFormProps> = ({ restoringProvider }) => {
  return (
    <div className={styles["restore-form"]}>
      <RestoreGoogle />
    </div>
  );
  return (
    <div className={styles["restore-form"]}>
      {restoringProvider === keyValue.EMAIL && <RestoreEmail />}
      {restoringProvider === keyValue.GOOGLE && <RestoreGoogle />}
    </div>
  );
};

export default RestoreForm;
