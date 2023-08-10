import { FC } from "react";

import RegisterForm from "./components/RegisterForm/RegisterForm";

const RegisterPage: FC = () => {
  return (
    <div>
      <RegisterForm dataAutomation="emailInput" />
    </div>
  );
};

export default RegisterPage;
