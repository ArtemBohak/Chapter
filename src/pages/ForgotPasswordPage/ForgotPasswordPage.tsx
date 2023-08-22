import { BlockAuth } from "@/src/components";
import { FC } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import ForgotPasswordMessage from "./components/ForgotPasswordMessage/ForgotPasswordMessage";

const ForgotPasswordPage: FC = () => {
  return (
    <BlockAuth heading="Forgot password">
      <ForgotPasswordForm />
      <ForgotPasswordMessage/>
    </BlockAuth>
  );
};

export default ForgotPasswordPage;
