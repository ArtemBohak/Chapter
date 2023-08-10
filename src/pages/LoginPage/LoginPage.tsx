import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./LoginPage.module.scss";

import Logo from "@/src/components/SVGComponents/Logo";

import LoginPageForm from "./components/LoginPageForm/LoginPageForm";
import Delimiter from "./components/Delimiter";
import LogInVia from "./components/LogInVia";

const LoginPage: FC = () => {
  return (
    <>
      <Logo className="md:block fixed top-[70px] left-[70px] hidden" />
      <div className={styles["loginPage-container"]}>
        <h1 className={styles["loginPage-title"]}>Log in</h1>
        <LoginPageForm />
        <Delimiter />
        <LogInVia />
        <div className="text-sm mb-[85px] sm:mb-[127px]">
          <div>
            <span className="font-medium">You don`t have an account?</span>
            &nbsp;
            <Link className="text-blue-1030 font-semibold" to="#">
              Sign up
            </Link>
          </div>
        </div>
        <div className="text-gray-1030 max-w-[302px] sm:max-w-[449px]">
          <p className="text-center text-2xs">
            By clicking “Sign in” above, you acknowledge that you have read and
            understood, and agree to Chapter's&nbsp;
            <Link className="underline" to="#">
              Terms & Conditions
            </Link>
            &nbsp; and&nbsp;
            <Link className="underline" to="#">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
