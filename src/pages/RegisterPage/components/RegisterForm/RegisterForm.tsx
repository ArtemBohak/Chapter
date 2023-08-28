import { FC } from "react";
import { Formik, Form } from "formik";
import cn from "classnames";

import { UIbutton, TextField } from "@/src/components";
import { IRegisterAccount, RegisterFormProps } from "./RegisterForm.type";

import styles from "./RegisterForm.module.scss";

const initialValues: IRegisterAccount = { email: "", signUpCode: "" };

const RegisterForm: FC<RegisterFormProps> = ({ className, ...props }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 1000);
      }}
      {...props}
    >
      {({ isSubmitting }) => (
        <Form className={cn(styles["register-form"], className)}>
          <TextField
            id="email"
            name="email"
            dataAutomation="emailInput"
            label="Your email"
          />
          <UIbutton
            dataAutomation="submitButton"
            type="submit"
            className={styles["register-form__button"]}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? <div>Load ...</div> : "Create new account"}
          </UIbutton>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
