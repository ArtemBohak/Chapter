import { BlockAuth } from "@/src/components";
import { FC, useState } from "react";

import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import ForgotPasswordMessage from "./components/ForgotPasswordMessage/ForgotPasswordMessage";

import styles from "./ForgotPasswordPage.module.scss";

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
