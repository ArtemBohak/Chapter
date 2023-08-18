import { FC } from "react";

import LoginForm from "./components/LoginForm/LoginForm";
import BlockAuth from "@/src/components/BlockAuth/BlockAuth";
import { AuthBy, AuthLink, Delimiter } from "@/src/components";
import { IconEnum } from "@/src/components/Icon";

import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  return (
    <BlockAuth heading="Log in" showBottomText={true} typePageText="Log in">
      <div className={styles["login-page"]}>
        <LoginForm />
        <Delimiter />
        <AuthBy
          socialLinks={[
            { link: "/", icon: IconEnum.Google },
            { link: "/", icon: IconEnum.Facebook },
            { link: "/", icon: IconEnum.Twitter },
          ]}
        />
        <AuthLink
          textMsg="You don`t have an account ?"
          linkMsg="Sign up"
          link="/register"
        />
      </div>
    </BlockAuth>
  );
};

export default LoginPage;