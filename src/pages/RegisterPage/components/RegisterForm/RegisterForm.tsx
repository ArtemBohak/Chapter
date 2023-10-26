import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { CSSTransition } from "react-transition-group";

import RegisterFormApi from "./RegisterFormApi";
import {
  RegisterAccountValues,
  EmailStatus,
  ErrorMessage,
  ErrorStatus,
  Steps,
  RegisterAccountKey,
} from "./RegisterForm.type";
import { validationSchema } from "./validationSchema";
import { getCookie, links, setCookie } from "@/src/utils";
import styles from "./RegisterForm.module.scss";

import { UIbutton, TextField } from "@/src/components";
import FormNotification from "../FormNotification/FormNotification";

const initialValues: RegisterAccountValues = {
  email: "",
  hash: "",
};

const RegisterForm: FC = () => {
  const [step, setStep] = useState(Steps.FIRST);
  const nodeRef = useRef(null);

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
        const { status, id } = await RegisterFormApi.fetchUserRegData({
          hash,
        });

        setCookie({ email, userId: id }, undefined, 604800);
        if (status === ErrorStatus.NOTFOUND)
          return setFieldError(RegisterAccountKey.HASH, ErrorMessage.HASH);

        return navigate(`${links.ACCOUNT_CREATION}/${id}`);
      }
      const { error, status } = await RegisterFormApi.fetchUserRegData({
        email,
      });

      if (
        status === ErrorStatus.UNPROCESSABLE_ENTITY &&
        RegisterFormApi.formatErrorResponse(error) === EmailStatus.UNCONFIRMED
      ) {
        resetForm({ values: { email, hash } });
        return setStep(step + 1);
      }
      if (
        status === ErrorStatus.UNPROCESSABLE_ENTITY &&
        getCookie("userId") &&
        getCookie("email") === email
      )
        return navigate(`${links.ACCOUNT_CREATION}/${getCookie("userId")}`);

      if (status === ErrorStatus.UNPROCESSABLE_ENTITY)
        return setFieldError(RegisterAccountKey.EMAIL, ErrorMessage.EMAIL);

      resetForm({ values: { email, hash } });
      setStep(step + 1);
    } finally {
      setSubmitting(false);
    }
  };

  const renderNextStep = (value: string) => (
    <CSSTransition
      nodeRef={nodeRef}
      in={isNextStep}
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
    </CSSTransition>
  );
  return (
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
  );
};

export default RegisterForm;
