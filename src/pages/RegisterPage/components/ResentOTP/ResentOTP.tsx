import { FC, useState } from "react";

import { ResentOTPProps } from "./ResentOTP.type";
import { AxiosError } from "axios";
import cn from "classnames";

import { EndpointsEnum, api } from "@/src/axios";
import { apiErrorStatus } from "@/src/types";
import styles from "./ResentOTP.module.scss";
import { useAppDispatch, userError } from "@/src/redux";

const ResentOTP: FC<ResentOTPProps> = ({ email }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const onHandleClick = async () => {
    try {
      setError(null);

      await api.patch(EndpointsEnum.RESENT_OTP, { email });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.status === apiErrorStatus.TOO_MANY_REQUEST)
          return setError(error.response?.data.error);

        dispatch(
          userError(
            error.response?.data.error ||
              error.response?.data.message ||
              error.response?.statusText ||
              error.message
          )
        );
      }
    }
  };
  const errorMessageClassNames = cn({ [styles["error"]]: error });

  return (
    <div className={styles["resent-wrapper"]}>
      <button
        onClick={onHandleClick}
        className={styles["resent-wrapper__button"]}
      >
        Send the <span>code</span> again?
      </button>
      <p className={errorMessageClassNames}>
        {error ? error : "You can only send 3 requests in 24 hours"}
      </p>
    </div>
  );
};

export default ResentOTP;
