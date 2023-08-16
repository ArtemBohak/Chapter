import { FC } from "react";
import cn from "classnames";

import { Form } from "./components";
import {
  AuthLink,
  Delimiter,
  Terms,
  AuthBy,
  Logo,
  TextField,
} from "@/src/components";

import { termMess } from "@/src/constants";

import styles from "./RegisterPage.module.scss";

const initialFieldValues = [
  {
    label: "Your email",
    type: "text",
    email: "",
  },
];

const RegisterPage: FC = () => {
  return (
    <>
      <Logo className="md:block fixed top-[70px] left-[70px] hidden" />
      <section className={cn(styles["registration-page"])}>
        <div className={cn(styles["registration-page__container"])}>
          <h1 className={cn(styles["registration-page__title"])}>Sign up</h1>
          <Form
            formName="register"
            fieldsValues={initialFieldValues}
            textFieldComponent={TextField}
            buttonTitle="Create new account"
          />
          <Delimiter />
          <AuthBy socialLinks={[{ link: "/" }, { link: "/" }, { link: "/" }]} />
          <AuthLink
            textMsg="Already have an account ?"
            linkMsg="Log in"
            link="/"
          />
          <Terms message={termMess} />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
