import { FC } from "react";

import styles from "@/src/pages/RegisterPage/RegisterPage.module.scss";
import { links } from "@/src/utils";

import { AuthLink, Delimiter, AuthBy, BlockAuth } from "@/src/components";
import { RegisterForm } from "@/src/pages/RegisterPage/components";

const RegisterPage: FC = () => (
  <BlockAuth
    heading="Sign up"
    showBottomText={true}
    typePageText="Create account"
  >
    <div className={styles["register-page"]}>
      <RegisterForm />
      <Delimiter />
      <AuthBy />
      <AuthLink
        textMsg="Already have an account ?"
        linkMsg="Log in"
        link={links.LOG_IN}
      />
    </div>
  </BlockAuth>
);

export default RegisterPage;
