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
            <div className="flex justify-end">
              <Link className="mb-[25px] text-xs text-blue-1030" to={"#"}>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPageForm;
