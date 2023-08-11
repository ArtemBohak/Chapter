import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";
import RegisterForm from "./components/RegisterForm/RegisterForm";

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
        <RegisterForm formName="register" fields={renderFields} />
      </div>
    </>
  );
};

export default RegisterPage;
