import { FC } from "react";
import { ForgotPasswordProps } from "../ForgotPasswordProps.types";
import styles from "../../ForgotPasswordPage.module.scss";

const ForgotPasswordMessage: FC<ForgotPasswordProps> = ({ setSubmitted }) => {
  return (
    <div className={styles["message-container"]}>
      <p className="mb-5">
        We just sent you link to restore your password. Please check your inbox.
      </p>
      <p>
        If you did not receive the email,&nbsp;
        <a onClick={() => setSubmitted(false)}>click here</a>
      </p>
    </div>
  );
};

export default ForgotPasswordMessage;
