import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";
import { Form } from "./components";
import { AuthLink, Delimiter, Terms, AuthBy } from "@/src/components";

import { termMess } from "@/src/constants";

import styles from "./RegisterPage.module.scss";
import TextInput from "./components/CustomForm/TemporaryInput";

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
