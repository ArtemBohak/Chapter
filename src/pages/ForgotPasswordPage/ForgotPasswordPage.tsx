import { FC, useState } from "react";

import styles from "./ForgotPasswordPage.module.scss";

import { BlockAuth } from "@/src/components";
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import ForgotPasswordMessage from "./components/ForgotPasswordMessage/ForgotPasswordMessage";

const ForgotPasswordPage: FC = () => {
  const [submitted, setSbmitted] = useState(false);
  return (
    <BlockAuth heading="Forgot password">
      <div className={styles["forgot-password-page"]}>
        {submitted ? (
          <ForgotPasswordMessage setSubmitted={setSbmitted} />
        ) : (
          <ForgotPasswordForm setSubmitted={setSbmitted} />
        )}
      </div>
    </BlockAuth>
  );
};

export default ForgotPasswordPage;
