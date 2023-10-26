import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { links, keysValue } from "@/src/types";
import { deleteCookie, redirectTimeoutValue } from "@/src/utils";
import styles from "./RestoreGoogle.module.scss";

import { UIbutton } from "@/src/components";

const RestoreGoogle: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(links.LOG_IN);
    }, redirectTimeoutValue);

    return () => {
      clearTimeout(t);
      deleteCookie(
        keysValue.DELETED_ACCOUNT_TIME_STAMP,
        keysValue.RESTORE_EMAIL,
        keysValue.RESTORE_TOKEN
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleClick = () => navigate(links.LOG_IN);

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
