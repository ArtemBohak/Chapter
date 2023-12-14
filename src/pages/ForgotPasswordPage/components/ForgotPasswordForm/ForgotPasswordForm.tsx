import { FC, useState } from "react";
import { Form, Formik } from "formik";

import { IForgotPassword } from "./ForgotPassword.types";
import { getCookies } from "@/src/utils";
import { useDebouncedNav, useErrorBoundary } from "@/src/hooks";
import { ForgotPasswordProps } from "../ForgotPasswordProps.types";
import ForgotPasswordApi from "./ForgotPasswordApi";

import {
  apiErrorMessage,
  apiErrorStatus,
  apiUiMessage,
  keysValue,
  links,
} from "@/src/types";
import validationSchema from "./validationSchema";

import { TextField, UIbutton } from "@/src/components";

const initialValues: IForgotPassword = { email: "" };

const ForgotPasswordForm: FC<ForgotPasswordProps> = ({ setSubmitted }) => {
  const setError = useErrorBoundary();
  const navigate = useDebouncedNav(1000 * 2);
  const [authError, setAuthError] = useState<string | null>(null);

  const onHandleSubmit = async (values: IForgotPassword) => {
    const [id, email] = getCookies(keysValue.USER_ID, keysValue.EMAIL);
    const res = await ForgotPasswordApi(values, setError);

    if (
      res.status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
      res.error === apiErrorMessage.EMAIL_UNCONFIRMED
    ) {
      navigate(links.SIGN_UP, values.email);
      return setAuthError(apiUiMessage.EMAIL_UNCONFIRMED);
    }
    if (
      res.status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
      res.error === apiErrorMessage.REGISTRATION_UNCOMPLETED
    ) {
      if (id && email) navigate(links.ACCOUNT_CREATION + "/" + id);
      else navigate(links.SIGN_UP);
      return setAuthError(apiUiMessage.REGISTRATION_UNCOMPLETED);
    }

    if (res.status === apiErrorStatus.UNPROCESSABLE_ENTITY) {
      navigate(links.SIGN_UP);
      return setAuthError(apiUiMessage.NOT_REGISTERED);
    }

    setSubmitted(true);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onHandleSubmit}
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
          {authError ? (
            <p className="text-red text-xxs text-center mt-1">{authError}</p>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
