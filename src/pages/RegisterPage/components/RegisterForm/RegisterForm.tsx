import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";

import { apiUiMessage, apiErrorStatus, links, keysValue } from "@/src/types";
import { useErrorBoundary } from "@/src/hooks";
import RegisterFormApi from "./RegisterFormApi";
import { getCookies, setCookies } from "@/src/utils";
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
      setFieldError,
      resetForm,
      setSubmitting,
    }: FormikHelpers<RegisterAccountValues>
  ) => {
    try {
      if (step === Steps.SECOND) {
        const res = await RegisterFormApi.fetchUserRegData(
          {
            hash: hash.trim(),
          },
          setError
        );
        const { id, email } = res;

        if (
          res.status === apiErrorStatus.BAD_REQUEST &&
          res.error === EmailStatus.INVALID_HASH
        )
          return setFieldError(
            RegisterAccountKey.HASH,
            apiUiMessage.INSPIRED_HASH
          );

        if (res.status === apiErrorStatus.NOTFOUND)
          return setFieldError(
            RegisterAccountKey.HASH,
            apiUiMessage.INVALID_HASH
          );

        if (id && email)
          setCookies({ email, userId: String(id) }, 604800, undefined, true);

        return navigate(`${links.ACCOUNT_CREATION}/${id}`);
      }
      setEmailValue(email);

      const { error, statusCode, message, status } =
        await RegisterFormApi.fetchUserRegData(
          {
            email: email.trim(),
          },
          setError
        );

      if (statusCode === apiErrorStatus.BAD_REQUEST)
        return setFieldError(RegisterAccountKey.EMAIL, message);

      if (
        status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
        error === EmailStatus.REGISTRATION_UNCOMPLETED &&
        cUId &&
        cEmail === email
      )
        return navigate(`${links.ACCOUNT_CREATION}/${cUId}`);

      if (
        status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
        error === EmailStatus.UNCONFIRMED
      ) {
        resetForm({ values: { email, hash } });
        return setStep(step + 1);
      }

      if (
        status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
        error === EmailStatus.CONFIRMED
      )
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
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form>
            <TextField
              id={RegisterAccountKey.EMAIL}
              name={RegisterAccountKey.EMAIL}
              value={values.email}
              dataAutomation={`${RegisterAccountKey.EMAIL}Input`}
              label="Your email"
              className={isNextStep ? styles["form__input"] : ""}
              disabled={isNextStep}
            />
            {renderNextStep(values.hash)}
            <UIbutton
              className={styles["form__button"]}
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
