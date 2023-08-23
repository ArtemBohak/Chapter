import { Form, Formik } from "formik";

import { IForgotPassword } from "./ForgotPassword.types";
import { TextField, UIbutton } from "@/src/components";
import { FC } from "react";

import PublicAxiosInstance from "@/src/axios/publicAxiosInstance";
import endpoints from "@/src/axios/endpoints";
import validationSchema from "./validationSchema";

const initialValues: IForgotPassword = { email: "" };

const ForgotPasswordForm: FC<IForgotPasswordProps> = ({ setSubmitted }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        PublicAxiosInstance.post(endpoints.FORGOT_PASSWORD, values)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.warn(err);
          });
        setSubmitted(true);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
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
            color="primary"
            variant="contained"
            size="medium"
            className="w-full"
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
