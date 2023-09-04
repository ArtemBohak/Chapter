import { FC } from "react";
import { Form, Formik, FormikProps } from "formik";
import styles from "./LoginForm.module.scss";
import { PasswordField, TextField } from "@/src/components/Fields";
import { UIbutton } from "@/src/components/Buttons";
import { ILoginPage } from "./LoginForm.types";
import validationSchema from "./validationSchema";

const LoginPageForm: FC = () => {
  return (
    <div className={styles["login-form"]}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
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
              helperLink={{
                text: "Forgot password?",
                href: "/auth/forgot-password",
              }}
            />

            <UIbutton
              type="submit"
              fullWidth
              dataAutomation="submitButton"
              className={styles["login-form__button"]}
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
