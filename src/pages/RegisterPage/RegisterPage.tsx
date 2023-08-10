import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const RegisterPage: FC = () => {
  return (
    <>
      <Logo />
      <div>
        <h1>Sign up</h1>
        <RegisterForm dataAutomation="emailInput" />
      </div>
    </>
  );
};

export default RegisterPage;
