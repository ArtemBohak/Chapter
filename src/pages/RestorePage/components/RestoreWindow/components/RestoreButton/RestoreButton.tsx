import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { apiErrorStatus, keysValue, links } from "@/src/types";
import { deleteCookie } from "@/src/utils";

import { RestoreButtonProps } from "./RestoreButton.type";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./RestoreButton.module.scss";

import { UIbutton } from "@/src/components";

const RestoreButton: FC<RestoreButtonProps> = ({
  setRestoringFormIsOpen,
  setShowError,
  email,
  token,
}) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setErrorBoundary = useErrorBoundary();

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
        setErrorBoundary(error);

        if (error.response?.data.status === apiErrorStatus.TOO_MANY_REQUEST) {
          return setShowError(true);
        }

        if (error.response?.data.status === apiErrorStatus.FORBIDDEN) {
          deleteCookie(
            keysValue.DELETED_ACCOUNT_TIME_STAMP,
            keysValue.RESTORE_EMAIL,
            keysValue.RESTORE_TOKEN
          );
          navigate(links.LOG_IN);
        }
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
      aria-label="Recover account button"
    >
      Recover account
    </UIbutton>
  );
};

export default RestoreButton;
