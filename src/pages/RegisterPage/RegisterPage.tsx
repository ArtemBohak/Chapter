import { FC } from "react";

import { AuthLink, Delimiter, AuthBy, BlockAuth } from "@/src/components";
import { RegisterForm } from "@/src/pages/RegisterPage/components";
import { IconEnum } from "@/src/components/Icon";

import styles from "@/src/pages/RegisterPage/RegisterPage.module.scss";

const RegisterPage: FC = () => (
  <BlockAuth
    heading="Sign up"
    showBottomText={true}
    typePageText="Create account"
  >
    <div className={styles["register-page"]}>
      <RegisterForm />
      <Delimiter />
      <AuthBy
        socialLinks={[
          { link: "/", icon: IconEnum.Google },
          { link: "/", icon: IconEnum.Facebook },
          { link: "/", icon: IconEnum.Twitter },
        ]}
      />
      <AuthLink
        textMsg="Already have an account ?"
        linkMsg="Log in"
        link="/login"
      />
    </div>
  </BlockAuth>
);

export default RegisterPage;
