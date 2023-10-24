import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  deleteCookie,
  keyValue,
  links,
  redirectTimeoutValue,
} from "@/src/utils";
import styles from "./RestoreGoogle.module.scss";

import { UIbutton } from "@/src/components";

const RestoreGoogle: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      deleteCookie(
        keyValue.DELETED_ACCOUNT_TIME_STAMP,
        keyValue.RESTORE_EMAIL,
        keyValue.RESTORE_TOKEN
      );
      navigate(links.LOG_IN);
    }, redirectTimeoutValue);

    return () => clearTimeout(t);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleClick = () => {
    deleteCookie(
      keyValue.DELETED_ACCOUNT_TIME_STAMP,
      keyValue.RESTORE_EMAIL,
      keyValue.RESTORE_TOKEN
    );
    navigate(links.LOG_IN);
  };
  return (
    <div className={styles["google-wrapper"]}>
      <h3>Your profile has been successfully restored!</h3>
      <UIbutton
        onClick={onHandleClick}
        dataAutomation="clickButton"
        fullWidth
        className={`${styles["google-wrapper__button"]} ${styles["btn"]}`}
      >
        Proceed to log in
      </UIbutton>
    </div>
  );
};

export default RestoreGoogle;
