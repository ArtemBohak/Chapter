import { Form, Formik } from "formik";

import { IForgotPassword } from "./ForgotPassword.types";
import { TextField, UIbutton } from "@/src/components";
import { FC } from "react";

import validationSchema from "./validationSchema";

import ForgotPasswordApi from "./ForgotPasswordApi";

const initialValues: IForgotPassword = { email: "" };

const ForgotPasswordForm: FC<ForgotPasswordProps> = ({ setSubmitted }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        ForgotPasswordApi(values);
        setSubmitted(true);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="max-w-xs mx-auto">
          <TextField
            id="email"
            name="email"
            dataAutomation="email"
            label="Your email"
            placeholder="Enter your email address..."
          />
          <UIbutton
            dataAutomation="submitButton"
            type="submit"
            size="medium"
            fullWidth
            isLoading={isSubmitting}
            disabled={!isValid || !dirty}
          >
            Restore my password
          </UIbutton>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
