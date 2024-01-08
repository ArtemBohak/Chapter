import { FC, useState } from "react";

import styles from "./ForgotPasswordPage.module.scss";

import { BlockAuth, Notification } from "@/src/components";
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import ForgotPasswordMessage from "./components/ForgotPasswordMessage/ForgotPasswordMessage";

const ForgotPasswordPage: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <BlockAuth heading="Forgot password">
      <div className={styles["forgot-password-page"]}>
        {submitted ? (
          <ForgotPasswordMessage setSubmitted={setSubmitted} />
        ) : (
          <ForgotPasswordForm
            setSubmitted={setSubmitted}
            setPopUpIsShowed={setShowPopUp}
          />
        )}
      </div>
      <Notification
        isOpen={showPopUp}
        setIsOpen={setShowPopUp}
        btnText="Confirm"
      >
        <>
          You have exhausted all attempts. <br />
          Try again tomorrow.
        </>
      </Notification>
    </BlockAuth>
  );
};

export default ForgotPasswordPage;
