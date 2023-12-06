import { FC } from "react";
import { Form, Formik } from "formik";

import { IForgotPassword } from "./ForgotPassword.types";
import { ForgotPasswordProps } from "../ForgotPasswordProps.types";
import ForgotPasswordApi from "./ForgotPasswordApi";
import { useErrorBoundary } from "@/src/hooks";
import validationSchema from "./validationSchema";

import { TextField, UIbutton } from "@/src/components";

const initialValues: IForgotPassword = { email: "" };

const ForgotPasswordForm: FC<ForgotPasswordProps> = ({ setSubmitted }) => {
  const setError = useErrorBoundary();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        ForgotPasswordApi(values, setError);
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
