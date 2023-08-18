import React from "react";
import { Link } from "react-router-dom";

const SingUp = () => {
  return (
    <div className="text-center text-sm mt-[10%]">
      <div>
        <span className="font-medium">You don`t have an account?</span>
        &nbsp;
        <Link className="text-blue-1030 font-semibold" to="#">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SingUp;
