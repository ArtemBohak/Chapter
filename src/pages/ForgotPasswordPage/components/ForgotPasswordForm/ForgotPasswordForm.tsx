import { Form, Formik } from "formik";

import { IForgotPassword } from "./ForgotPassword.types";
import { TextField, UIbutton } from "@/src/components";
import { FC } from "react";

import api from "@/src/axios/api";

import validationSchema from "./validationSchema";
import { EndpointsEnum } from "@/src/axios/endpoints.types";

const initialValues: IForgotPassword = { email: "" };

const ForgotPasswordForm: FC<ForgotPasswordProps> = ({ setSubmitted }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        api.post(EndpointsEnum.FORGOT_PASSWORD, values)
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
