import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";
import { Form } from "./components";
import { AuthLink, Delimiter, Terms, AuthBy } from "@/src/components";

import { termMess } from "@/src/constants";

import styles from "./RegisterPage.module.scss";

const RegisterPage: FC = () => {
  const renderFields = [
    {
      label: "Your email",
      type: "email",
      email: "",
    },
  ];

  return (
    <>
      <Logo className="md:block fixed top-[70px] left-[70px] hidden" />
      <div className={styles["regPage-container"]}>
        <h1 className={styles["regPage-title"]}>Sign up</h1>
        <Form formName="register" fields={renderFields} />
        <Delimiter />
        <AuthBy socialLinks={[{ link: "/" }, { link: "/" }, { link: "/" }]} />
        <AuthLink
          textMsg="Already have an account ?"
          linkMsg="Log in"
          link="/"
        />
        <Terms message={termMess} />
      </div>
    </>
  );
};

export default RegisterPage;
