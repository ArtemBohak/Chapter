import { FC, useState } from "react";

import { ResentOTPProps } from "./ResentOTP.type";
import styles from "./ResentOTP.module.scss";

const ResentOTP: FC<ResentOTPProps> = ({ email }) => {
  const [error, setError] = useState<string | null>(null);
  const onHandleClick = () => {
    console.log(email);
    setError(null);
  };
  return (
    <div className={styles["resent-wrapper"]}>
      <button
        onClick={onHandleClick}
        className={styles["resent-wrapper__button"]}
      >
        Send the <span>code</span> again?
      </button>
      <p>{error ? error : "You can send only three requests during the day"}</p>
    </div>
  );
};

export default ResentOTP;
