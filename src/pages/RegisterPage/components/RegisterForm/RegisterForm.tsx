import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import cn from "classnames";

import {
  IRegisterAccount,
  RegisterFormProps,
  Steps,
  RegisterAccountKey,
} from "./RegisterForm.type";
import { validationSchema } from "./validationSchema";
import styles from "./RegisterForm.module.scss";

import { UIbutton, TextField } from "@/src/components";
import FormNotification from "../FormNotification/FormNotification";

const initialValues: IRegisterAccount = {
  email: "",
  hash: "",
};

const RegisterForm: FC<RegisterFormProps> = ({ className, ...props }) => {
  const [step, setStep] = useState(Steps.FIRST);
  const navigate = useNavigate();

  const schemaTypeValidation = step > Steps.FIRST;
  // const isDisabled = step > Steps.FIRST;

  const error = "";

  const onHandleSubmit = async (
    { email, hash }: IRegisterAccount,
    setFieldError: (field: string, errorMsg: string) => void
  ) => {
    if (step === Steps.SECOND) {
      console.log("request => ", { email, hash });
      if (error) return setFieldError(RegisterAccountKey.HASH, error);
      return navigate("/account-creation", { state: { email, hash } });
    }

    console.log("request => ", { email });
    if (error) return setFieldError(RegisterAccountKey.EMAIL, error);
    setStep((state) => (state += Steps.FIRST));
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
      onSubmit={(
        values: IRegisterAccount,
        { setFieldError, setSubmitting, resetForm }
      ) => {
        setTimeout(() => {
          onHandleSubmit(values, setFieldError);
          setSubmitting(false);
          resetForm();
        }, 1000);
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
            // disabled={isDisabled}
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
