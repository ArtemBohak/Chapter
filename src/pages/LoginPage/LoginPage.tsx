import { FC } from "react";

import { links } from "@/src/types";
import styles from "./LoginPage.module.scss";

import { AuthBy, AuthLink, Delimiter, BlockAuth } from "@/src/components";
import LoginForm from "./components/LoginForm/LoginForm";

const LoginPage: FC = () => {
  return (
    <BlockAuth heading="Log in" showBottomText={true} typePageText="Log in">
      <div className={styles["login-page"]}>
        <LoginForm />
        <Delimiter />
        <AuthBy />
        <AuthLink
          textMsg="You don`t have an account ?"
          linkMsg="Sign up"
          link={links.SIGN_UP}
        />
      </div>
    </BlockAuth>
  );
};

export default LoginPage;
