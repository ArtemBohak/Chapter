import { DetailsHTMLAttributes, FC, InputHTMLAttributes } from "react";

type InputProps<T> = { dataAutomation: "emailInput" | "input" };

const RegisterForm: FC<InputProps> = ({ dataAutomation }) => {
  return (
    <div>
      <h2>Sign up</h2>
      <form>
        <label htmlFor="email">Your email</label>
        <input
          id="email"
          type="email"
          name="email"
          data-automation={dataAutomation}
        />
      </form>
    </div>
  );
};

export default RegisterForm;
