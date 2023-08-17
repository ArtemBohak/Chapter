import { FC } from "react";
import { Formik, Form } from "formik";
import cn from "classnames";

import { UIbutton, TextField } from "@/src/components";
import { IRegisterAccount } from "@/src/pages/RegisterPage";

import styles from "./RegisterForm.module.scss";

type FormPropsTypes = {
  className?: string;
};

const initialValues: IRegisterAccount = { email: "", signUpCode: "" };

const RegisterForm: FC<FormPropsTypes> = ({ className, ...props }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: IRegisterAccount, { setSubmitting }) => {
        console.log(1);
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 1000);
      }}
      {...props}
    >
      {({ isSubmitting }) => (
        <Form className={cn(styles["register-from"], className)}>
          <TextField
            id="email"
            name="email"
            dataAutomation="emailInput"
            label="Your email"
          />
          <UIbutton
            dataAutomation="submitButton"
            type="submit"
            className={cn(styles["register-from__button"])}
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
