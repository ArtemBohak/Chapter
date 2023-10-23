import { FC, useState } from "react";
import { AxiosError } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { getCookie, keyValue } from "@/src/utils";
import { RestoreButtonProps } from "./RestoreButton.type";
import styles from "./RestoreButton.module.scss";

import { UIbutton } from "@/src/components";

const RestoreButton: FC<RestoreButtonProps> = ({
  setRestoringProvider,
  setRestoringFormIsOpen,
}) => {
  const email = getCookie(keyValue.RESTORE_EMAIL);
  const token = getCookie(keyValue.RESTORE_TOKEN);

  const [loading, setLoading] = useState(false);

  const onHandleClick = async () => {
    setLoading(true);
    try {
      if (email) {
        await api.post(EndpointsEnum.EMAIL_RESTORE, { email });

        setRestoringProvider(keyValue.EMAIL);
      }

      if (token) {
        await api.post(
          EndpointsEnum.GOOGLE_RESTORE,
          {},
          { headers: { Authorization: "Bearer" + " " + token } }
        );
        setRestoringProvider(keyValue.GOOGLE);
      }
      setRestoringFormIsOpen(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <UIbutton
      isLoading={loading}
      disabled={loading}
      dataAutomation="clickButton"
      onClick={onHandleClick}
      fullWidth
      className={`${styles["restore-btn"]} ${styles["button"]}`}
    >
      Recover account
    </UIbutton>
  );
};

export default RestoreButton;
