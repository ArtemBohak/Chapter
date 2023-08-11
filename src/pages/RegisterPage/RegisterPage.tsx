import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const RegisterPage: FC = () => {
  return (
    <>
      <Logo className="md:block" />
      <div>
        <h1>Sign up</h1>
        <RegisterForm
          formName="register"
          fieldArray={[{ name: "email", label: "Your email" }]}
        />
      </div>
    </>
  );
};

export default RegisterPage;
