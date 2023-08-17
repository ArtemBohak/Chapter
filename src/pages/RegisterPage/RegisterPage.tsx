import { FC } from "react";

import PublicLayout from "@/src/layouts/PublicLayout/PublicLayout";
import { AuthLink, Delimiter, AuthBy, BlockAuth } from "@/src/components";
import { RegisterForm } from "@/src/pages/RegisterPage";
import { IconEnum } from "@/src/components/Icon";

import styles from "@/src/pages/RegisterPage/RegisterPage.module.scss";

const RegisterPage: FC = () => (
  <PublicLayout>
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
          link="/"
        />
      </div>
    </BlockAuth>
  </PublicLayout>
);

export default RegisterPage;
