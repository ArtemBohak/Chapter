import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { AxiosError } from "axios";

import { apiUiMessage, apiErrorStatus, links, keysValue } from "@/src/types";
import { useErrorBoundary } from "@/src/hooks";
import { store, userError } from "@/src/redux";
import { getCookies, setCookies } from "@/src/utils";

import {
  RegisterAccountValues,
  EmailStatus,
  Steps,
  RegisterAccountKey,
} from "./RegisterForm.type";
import RegisterFormApi from "./RegisterFormApi";
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
  const setError = useErrorBoundary();
  const [step, setStep] = useState(Steps.FIRST);
  const [emailValue, setEmailValue] = useState("");
  const nodeRef = useRef(null);
  const [cUId, cEmail] = getCookies(keysValue.USER_ID, keysValue.EMAIL);

  const navigate = useNavigate();
  const { state } = useLocation();

  const isNextStep = step > Steps.FIRST;

  useEffect(() => {
    if (state) {
      setStep(Steps.SECOND);
      setEmailValue(state);
    }
  }, [state]);

  useEffect(() => {
    navigate(location.pathname, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleSubmit = async (
    { email, hash }: RegisterAccountValues,
    {
      setErrors,
      resetForm,
      setSubmitting,
    }: FormikHelpers<RegisterAccountValues>
  ) => {
    try {
      if (step === Steps.SECOND) {
        const res = await RegisterFormApi.fetchUserRegData({
          hash: hash.trim(),
        });
        const { id, email } = res.data;
        setCookies({ email, userId: id }, { expires: 7, secure: true });
        return navigate(`${links.ACCOUNT_CREATION}/${id}`);
      }

      setEmailValue(email);
      await RegisterFormApi.fetchUserRegData({
        email: email.trim(),
      });

      resetForm({ values: { email, hash } });
      setStep(step + 1);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
        store.dispatch(
          userError(
            error.response?.data.error ||
              error.response?.data.message ||
              error.response?.statusText ||
              error.message
          )
        );

        if (
          error.response?.status === apiErrorStatus.CONFLICT &&
          error.response?.data.message === EmailStatus.UNCONFIRMED
        ) {
          resetForm({ values: { email, hash } });
          return setStep(step + 1);
        }

        if (
          error.response?.status === apiErrorStatus.CONFLICT &&
          error.response?.data.message ===
            EmailStatus.REGISTRATION_UNCOMPLETED &&
          cUId &&
          cEmail === email
        ) {
          return navigate(`${links.ACCOUNT_CREATION}/${cUId}`);
        }

        if (
          error.response?.status === apiErrorStatus.CONFLICT &&
          error.response?.data.message === EmailStatus.CONFIRMED
        ) {
          return setErrors({ ["email"]: apiUiMessage.EMAIL_IN_USE });
        }

        if (
          error.response?.status === apiErrorStatus.BAD_REQUEST &&
          error.response?.data.error === EmailStatus.INVALID_HASH
        ) {
          return setErrors({ hash: apiUiMessage.INSPIRED_HASH });
        }

        if (
          error.response?.status === apiErrorStatus.NOTFOUND &&
          error.response?.data.error === "notFound"
        ) {
          return setErrors({ hash: apiUiMessage.INVALID_HASH });
        }

        if (
          error.response?.status === apiErrorStatus.BAD_REQUEST ||
          error.response?.status === apiErrorStatus.UNPROCESSABLE_ENTITY
        ) {
          const [errorKey] = Object.keys(error.response?.data?.errors);
          return setErrors({
            [errorKey]: error.response?.data.errors[errorKey],
          });
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderNextStep = (value: string) => (
    <Animation
      in={isNextStep}
      nodeRef={nodeRef}
      timeout={300}
      classNames={{
        enter: styles["form__input-enter"],
        enterActive: styles["form__input-enter-active"],
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
          additionalLabel="It may take up to 2 minutes for the code to be sent."
          value={value}
          aria-label="OTP input field"
        />
      </div>
    </Animation>
  );

  return (
    <div className={styles["form"]}>
      <Formik
        initialValues={{ ...initialValues, ...(state ? { email: state } : {}) }}
        validationSchema={validationSchema(isNextStep)}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, dirty, isValid, values }) => {
          return (
            <Form>
              <TextField
                id={RegisterAccountKey.EMAIL}
                name={RegisterAccountKey.EMAIL}
                value={values.email}
                dataAutomation={`${RegisterAccountKey.EMAIL}Input`}
                label="Your email"
                className={isNextStep ? styles["form__input"] : ""}
                disabled={isNextStep}
                aria-label="Email input field"
              />
              {renderNextStep(values.hash)}
              <UIbutton
                className={styles["form__button"]}
                dataAutomation="submitButton"
                type="submit"
                aria-label="Submit form button"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting || !isValid || !dirty}
              >
                Create new account
              </UIbutton>
            </Form>
          );
        }}
      </Formik>
      {step === Steps.SECOND ? <ResentOTP email={emailValue} /> : null}
    </div>
  );
};

export default RegisterForm;
