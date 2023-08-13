import { FC } from "react";

import { Form } from "./components";
import { AuthLink, Delimiter, Terms, AuthBy, Logo } from "@/src/components";
import TextInput from "./TemporaryInput";

import { termMess } from "@/src/constants";

import styles from "./RegisterPage.module.scss";

const initialFieldValues = [
  {
    label: "Your email",
    type: "email",
    email: "",
    labelClassName: "label",
    fieldClassName:
      "w-[327px] h-[35px] mb-[15px] px-2 py-1 rounded-[5px] border border-gray-1030",
  },
];

const RegisterPage: FC = () => {
  return (
    <>
      <Logo className="md:block fixed top-[70px] left-[70px] hidden" />
      <div className={styles["regPage-container"]}>
        <h1 className={styles["regPage-title"]}>Sign up</h1>
        <Form
          formName="register"
          className="max-w-[327px]"
          fieldsValues={initialFieldValues}
          textFieldComponent={TextInput}
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
    </>
  );
};

export default RegisterPage;
