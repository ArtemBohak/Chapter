import { Form, Formik } from "formik";

import { IForgotPassword } from "./ForgotPassword.types";
import { TextField, UIbutton } from "@/src/components";
import { FC } from "react";

import PublicAxiosInstance from "@/src/axios/publicAxiosInstance";
import endpoints from "@/src/axios/endpoints";

const initialValues: IForgotPassword = { email: "" };

const ForgotPasswordForm: FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        PublicAxiosInstance.post(endpoints.FORGOT_PASSWORD, values).catch(
          (err) => {
            console.warn(err);
          }
        );
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className={""}>
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
            className="p-[12px] text-sm mb-[10px]"
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
