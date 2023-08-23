import { FC } from "react";
import styles from "../../ForgotPasswordPage.module.scss";

const ForgotPasswordMessage: FC<IForgotPasswordProps> = ({ setSubmitted }) => {
  return (
    <div className={styles["message-container"]}>
      <div className="mb-4">
        We just sent you link to restore your password. Please check your inbox.
      </div>
      <div className="text-xs">
        If you did not receive the email,&nbsp;
        <a className="" onClick={() => setSubmitted(false)}>
          click here
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordMessage;
