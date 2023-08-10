import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";
import { FC } from "react";

type InputProps = { dataAutomation?: "emailInput" | "input" };

const RegisterForm: FC<InputProps> = ({ dataAutomation }) => {
  return (
    <form>
      <label htmlFor="email">Your email</label>
      <input
        id="email"
        type="email"
        name="email"
        data-automation={dataAutomation}
      />
      <UIbutton
        dataAutomation="submitButton"
        // type="submit"
        title="Create new account "
      />
    </form>
  );
};

export default RegisterForm;
