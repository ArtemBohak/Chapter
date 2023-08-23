import { FC } from "react";
import { Form, Formik, FormikProps } from "formik";
import styles from "./LoginForm.module.scss";
import { Link } from "react-router-dom";
import { PasswordField, TextField } from "@/src/components/Fields";
import { UIbutton } from "@/src/components/Buttons";
import { ILoginPage } from "./LoginForm.types";

const LoginPageForm: FC = () => {
  return (
    <div className={styles["login-page-form"]}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
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
              dataAutomation="email"
            />
            <PasswordField
              id="password"
              name="password"
              label="Your password"
              dataAutomation="password"
            />
            <div className="flex justify-end">
              <Link className="mb-[25px] text-xs text-blue" to={"#"}>
                Forgot password?
              </Link>
            </div>
            <UIbutton
              type="submit"
              fullWidth
              dataAutomation="submitButton"
              className="p-[12px] text-sm mb-[10px]"
              disabled={!isValid || !dirty}
              isLoading={isSubmitting}
            >
              Log in
            </UIbutton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPageForm;
