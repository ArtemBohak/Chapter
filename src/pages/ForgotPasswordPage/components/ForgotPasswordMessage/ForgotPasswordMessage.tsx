import { FC } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordMessage: FC = () => {
  return (
    <div className="max-w-xs text-gray-1030 text-sm font-normal">
      <p>
        We just sent you link to restore your password. Please check your inbox.
      </p>
      <p className="text-xs">
        If you did not receive the email,{" "}
        <Link className="text-blue-1030" to="/login/forgot-password">
          click here
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordMessage;
