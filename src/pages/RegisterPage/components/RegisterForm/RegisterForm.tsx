import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import cn from "classnames";

import RegisterFormApi from "./RegisterFormApi";
import {
  type RegisterFormProps,
  RegisterAccountValues,
  SetFieldError,
  ResetForm,
  ErrorMessage,
  Steps,
  RegisterAccountKey,
} from "./RegisterForm.type";
import { validationSchema } from "./validationSchema";
import styles from "./RegisterForm.module.scss";

import { UIbutton, TextField } from "@/src/components";
import FormNotification from "../FormNotification/FormNotification";

const initialValues: RegisterAccountValues = {
  email: "",
  hash: "",
};

const RegisterForm: FC<RegisterFormProps> = ({ className, ...props }) => {
  const [step, setStep] = useState(Steps.FIRST);

  const navigate = useNavigate();

  const schemaTypeValidation = step > Steps.FIRST;
  const isDisabled = step > Steps.FIRST;

  const onHandleSubmit = async <
    T extends RegisterAccountValues,
    K extends SetFieldError,
    N extends ResetForm,
  >(
    { email, hash }: T,
    setFieldError: K,
    resetForm: N
  ) => {
    if (step === Steps.SECOND) {
      const { status, id } = await RegisterFormApi.fetchUserRegData({
        hash,
      });

      return status === 404
        ? setFieldError(RegisterAccountKey.HASH, ErrorMessage.HASH)
        : navigate(`/auth/account-creation/${id}`);
      resetForm();
    }
    const { error, status } = await RegisterFormApi.fetchUserRegData({
      email,
    });

    if (
      status === 422 &&
      RegisterFormApi.formatErrorResponse(error) === "inactive"
    )
      return setStep(step + 1);

    return status === 422
      ? setFieldError(RegisterAccountKey.EMAIL, ErrorMessage.EMAIL)
      : setStep(step + 1);
  };

  const renderNextStep = (value: string) =>
    step > Steps.FIRST ? (
      <>
        <FormNotification />
        <TextField
          id={RegisterAccountKey.HASH}
          name={RegisterAccountKey.HASH}
          dataAutomation={`${RegisterAccountKey.HASH}Input`}
          label="Sign up code"
          value={value}
        />
      </>
    ) : null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(schemaTypeValidation)}
      onSubmit={async (
        values: RegisterAccountValues,
        { setFieldError, setSubmitting, resetForm }
      ) => {
        await onHandleSubmit(values, setFieldError, resetForm);
        setSubmitting(false);
      }}
      {...props}
    >
      {({ isSubmitting, dirty, isValid, values }) => (
        <Form className={cn(styles["register-form"], className)}>
          <TextField
            id={RegisterAccountKey.EMAIL}
            name={RegisterAccountKey.EMAIL}
            value={values.email}
            dataAutomation={`${RegisterAccountKey.EMAIL}Input`}
            label="Your email"
            className={step > Steps.FIRST ? "mb-0" : ""}
            disabled={isDisabled}
          />
          {renderNextStep(values.hash)}
          <UIbutton
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
