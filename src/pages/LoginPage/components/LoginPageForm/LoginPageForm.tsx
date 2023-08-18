import { FC } from "react";
import { Form, Formik, FormikProps } from "formik";
import styles from "./LoginPageForm.module.scss";
import { Link } from "react-router-dom";
import { PasswordField, TextField } from "@/src/components/Fields";
import { UIbutton } from "@/src/components/Buttons";
import { ILoginPage } from "./LoginPageForm.types";
import Delimiter from "../Delimiter/Delimiter";
import LoginVia from "../LogInVia/LoginVia";
import SingUp from "../SignUp/SingUp";

const LoginPageForm: FC = () => {
  return (
    <div className={styles["login-page-form"]}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // temp
          setTimeout(() => {
            console.log("values", values);
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting, isValid, dirty }: FormikProps<ILoginPage>) => (
          <Form>
            <TextField
              id="email"
              name="email"
              label="Your email"
              placeholder=""
              dataAutomation="email"
            />
            <PasswordField
              id="password"
              name="password"
              label="Your password"
              placeholder=""
              dataAutomation="password"
            />
            <div className=" flex justify-end">
              <Link
                className="mb-[25px] text-right  text-xs text-blue-1030"
                to={"#"}
              >
                Forgot password?
              </Link>
            </div>
            <UIbutton
              type="submit"
              variant="orange-contained"
              dataAutomation="submitButton"
              className="p-[12px] text-sm"
              disabled={!isValid || !dirty}
              isLoading={isSubmitting ? true : false}
            >
              Log in
            </UIbutton>
            <Delimiter />
            <LoginVia />
            <SingUp />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPageForm;
