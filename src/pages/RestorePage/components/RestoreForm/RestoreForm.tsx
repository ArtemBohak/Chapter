import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { RestoringFormProps } from "./RestoreForm.type";
import { deleteCookie, getCookie, keyValue } from "@/src/utils";
import styles from "./RestoreForm.module.scss";

import RestoreEmail from "./components/RestoreEmail/RestoreEmail";
import RestoreGoogle from "./components/RestoreGoogle/RestoreGooge";
import { Icon, IconEnum } from "@/src/components";

const RestoreForm: FC<RestoringFormProps> = ({
  restoringProvider,
  ...props
}) => {
  const navigate = useNavigate();

  const onHandleClick = () => {
    getCookie(keyValue.RESTORE_TOKEN) &&
      deleteCookie(
        keyValue.DELETED_ACCOUNT_TIME_STAMP,
        keyValue.RESTORE_EMAIL,
        keyValue.RESTORE_TOKEN
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
      {restoringProvider === keyValue.EMAIL && <RestoreEmail {...props} />}
      {restoringProvider === keyValue.GOOGLE && <RestoreGoogle />}
    </div>
  );
};

export default RestoreForm;
