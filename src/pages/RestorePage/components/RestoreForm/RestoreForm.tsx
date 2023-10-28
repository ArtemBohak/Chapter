import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { keysValue } from "@/src/types";
import { deleteCookie, getCookies } from "@/src/utils";
import { RestoringFormProps } from "./RestoreForm.type";
import styles from "./RestoreForm.module.scss";

import { Icon, IconEnum } from "@/src/components";
import RestoreEmail from "./components/RestoreEmail/RestoreEmail";
import RestoreGoogle from "./components/RestoreGoogle/RestoreGoogle";

const RestoreForm: FC<RestoringFormProps> = ({
  restoringProvider,
  ...props
}) => {
  const navigate = useNavigate();

  const [cRestoreToken] = getCookies(keysValue.RESTORE_TOKEN);

  const onHandleClick = () => {
    cRestoreToken &&
      deleteCookie(
        keysValue.DELETED_ACCOUNT_TIME_STAMP,
        keysValue.RESTORE_EMAIL,
        keysValue.RESTORE_TOKEN
      );
    navigate(-1);
  };

  return (
    <div className={styles["restore-form"]}>
      <button
        className={styles["restore-form__button"]}
        onClick={onHandleClick}
      >
        <Icon icon={IconEnum.Cross} size={32} />
      </button>
      {restoringProvider === keysValue.EMAIL && <RestoreEmail {...props} />}
      {restoringProvider === keysValue.GOOGLE && <RestoreGoogle />}
    </div>
  );
};

export default RestoreForm;
