import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const RegisterPage: FC = () => {
  const renderFields = [
    {
      value: "",
      label: "Your email",
      type: "email",
      name: "email",
    },
  ];

  return (
    <>
      <Logo className="md:block" />
      <div>
        <h1>Sign up</h1>
        <RegisterForm formName="register" fields={renderFields} />
      </div>
    </>
  );
};

export default RegisterPage;
