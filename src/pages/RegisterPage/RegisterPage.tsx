import { FC } from "react";
import cn from "classnames";

import PublicLayout from "@/src/layouts/PublicLayout/PublicLayout";
import { AuthLink, Delimiter, Terms, AuthBy } from "@/src/components";
import { RegisterForm } from "@/src/pages/RegisterPage";
import { termMess } from "@/src/constants";
import { IconEnum } from "@/src/components/Icon";

import styles from "@/src/pages/RegisterPage/RegisterPage.module.scss";

const RegisterPage: FC = () => {
  return (
    <PublicLayout>
      <section className={cn(styles["registration-page"])}>
        <div className={cn(styles["registration-page__container"])}>
          <h1 className={cn(styles["registration-page__title"])}>Sign up</h1>
          <RegisterForm buttonTitle="Create new account" />
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
          <Terms message={termMess} />
        </div>
      </section>
    </PublicLayout>
  );
};

export default RegisterPage;
