import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { EndpointsEnum, api } from "@/src/axios";

import { RestoreButtonProps } from "./RestoreButton.type";
import styles from "./RestoreButton.module.scss";

import { UIbutton } from "@/src/components";
import { links } from "@/src/utils";

const RestoreButton: FC<RestoreButtonProps> = ({
  setRestoringFormIsOpen,
  email,
  token,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onHandleClick = async () => {
    if (!email && !token) return navigate(links.LOG_IN);

    setLoading(true);
    try {
      if (email) {
        await api.post(EndpointsEnum.EMAIL_RESTORE, {
          email,
        });
      }

      if (token) {
        await api.post(
          EndpointsEnum.GOOGLE_RESTORE,
          {},
          { headers: { Authorization: "Bearer" + " " + token } }
        );
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
