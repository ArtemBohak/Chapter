import { FC } from "react";
import { Form, Formik, FormikProps } from "formik";
import styles from "./LoginForm.module.scss";
import { PasswordField, TextField } from "@/src/components/Fields";
import { UIbutton } from "@/src/components/Buttons";
import { ILoginPage, setErrors } from "./LoginForm.type";

import validationSchema from "./validationSchema";
import LoginApi from "./LoginApi";
import { links } from "@/src/utils/links/links.types";
import { useNavigate } from "react-router-dom";
import { ErrorStatus } from "@/src/pages/RegisterPage/components/RegisterForm/RegisterForm.type";

const LoginPageForm: FC = () => {
  const navigate = useNavigate();

  const onHandleSubmit = async (values: ILoginPage, setErrors: setErrors) => {
    const { status, data } = await LoginApi(values);

    if (status === ErrorStatus.UNPROCESSABLE_ENTITY) {
      setErrors({ ["email"]: " ", ["password"]: "wrong email or password" });
    } else {
      localStorage.setItem("token", data.token);
      navigate(links.FEED);
    }
  };
  return (
    <div className={styles["login-form"]}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          await onHandleSubmit(values, setErrors);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty }: FormikProps<ILoginPage>) => (
          <Form>
            <TextField
              id="email"
              name="email"
              label="Your email"
              dataAutomation="emailInput"
            />
            <PasswordField
              id="password"
              name="password"
              label="Your password"
              dataAutomation="passwordInput"
              helperLink={{
                text: "Forgot password?",
                href: links.FORGOT_PASSWORD,
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
