import { FC } from "react";

import LoginForm from "./components/LoginForm/LoginForm";
import BlockAuth from "@/src/components/BlockAuth/BlockAuth";
import { AuthBy, AuthLink, Delimiter } from "@/src/components";

import styles from "./LoginPage.module.scss";
import { links } from "@/src/utils/links/links.types";

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
