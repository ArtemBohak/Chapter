import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";

import { apiUiMessage, apiErrorStatus, links } from "@/src/types";

import RegisterFormApi from "./RegisterFormApi";
import { useAppDispatch, updateUserId } from "@/src/redux";
import {
  RegisterAccountValues,
  EmailStatus,
  Steps,
  RegisterAccountKey,
} from "./RegisterForm.type";
import { validationSchema } from "./validationSchema";
import styles from "./RegisterForm.module.scss";

import { UIbutton, TextField, Animation } from "@/src/components";
import FormNotification from "../FormNotification/FormNotification";
import ResentOTP from "../ResentOTP/ResentOTP";

const initialValues: RegisterAccountValues = {
  email: "",
  hash: "",
};

const RegisterForm: FC = () => {
  const [step, setStep] = useState(Steps.FIRST);
  const [emailValue, setEmailValue] = useState("");
  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isNextStep = step > Steps.FIRST;

  const onHandleSubmit = async (
    { email, hash }: RegisterAccountValues,
    {
      setFieldError,
      resetForm,
      setSubmitting,
    }: FormikHelpers<RegisterAccountValues>
  ) => {
    try {
      if (step === Steps.SECOND) {
        const { status, id, email } = await RegisterFormApi.fetchUserRegData({
          hash,
        });

        if (status === apiErrorStatus.NOTFOUND)
          return setFieldError(
            RegisterAccountKey.HASH,
            apiUiMessage.INVALID_HASH
          );
        if (id && email) dispatch(updateUserId({ id, email }));
        return navigate(`${links.ACCOUNT_CREATION}/${id}`);
      }
      setEmailValue(email);

      const {
        error,
        statusCode,
        message,
        status,
        id,
        email: emailValue,
      } = await RegisterFormApi.fetchUserRegData({
        email,
      });

      if (id && emailValue) {
        dispatch(updateUserId({ id, email: emailValue }));
        return navigate(`${links.ACCOUNT_CREATION}/${id}`);
      }

      if (statusCode === apiErrorStatus.BAD_REQUEST)
        return setFieldError(RegisterAccountKey.EMAIL, message);

      if (
        status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
        RegisterFormApi.formatErrorResponse(error) === EmailStatus.UNCONFIRMED
      ) {
        resetForm({ values: { email, hash } });
        return setStep(step + 1);
      }

      if (status === apiErrorStatus.UNPROCESSABLE_ENTITY)
        return setFieldError(
          RegisterAccountKey.EMAIL,
          apiUiMessage.EMAIL_IN_USE
        );

      if (!error) {
        resetForm({ values: { email, hash } });
        setStep(step + 1);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderNextStep = (value: string) => (
    <Animation
      isMount={isNextStep}
      nodeRef={nodeRef}
      timeout={300}
      classNames={{
        enter: styles["register-form__hash-input--enter"],
        enterActive: styles["register-form__hash-input--enter-active"],
      }}
      unmountOnExit
    >
      <div ref={nodeRef}>
        <FormNotification />
        <TextField
          id={RegisterAccountKey.HASH}
          name={RegisterAccountKey.HASH}
          dataAutomation={`${RegisterAccountKey.HASH}Input`}
          label="Sign up code"
          value={value}
        />
      </div>
    </Animation>
  );

  return (
    <div className={styles["register"]}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(isNextStep)}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className={styles["register-form"]}>
            <TextField
              id={RegisterAccountKey.EMAIL}
              name={RegisterAccountKey.EMAIL}
              value={values.email}
              dataAutomation={`${RegisterAccountKey.EMAIL}Input`}
              label="Your email"
              className={isNextStep ? "mb-0" : ""}
              disabled={isNextStep}
            />
            {renderNextStep(values.hash)}
            <UIbutton
              className={styles["register-form__button"]}
              dataAutomation="submitButton"
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
            >
              Create new account
            </UIbutton>
          </Form>
        )}
      </Formik>
      {step === Steps.SECOND ? <ResentOTP email={emailValue} /> : null}
    </div>
  );
};

export default RegisterForm;
