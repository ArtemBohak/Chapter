import { FC, useState } from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { AxiosError } from "axios";

import {
  apiErrorMessage,
  apiErrorStatus,
  apiUiMessage,
  keysValue,
} from "@/src/types";
import { deleteCookie } from "@/src/utils";
import { EndpointsEnum, api } from "@/src/axios";

import { FormValues, RestoreEmailProps } from "./RestoreEmail.type";
import { validationSchema } from "./validationSchema";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./RestoreEmail.module.scss";

import { Loader, TextField, UIbutton } from "@/src/components";

const initialValues: FormValues = {
  hash: "",
};

const RestoreEmail: FC<RestoreEmailProps> = ({
  email,
  setRestoreMsgIsShown,
  setShowError,
}) => {
  const setError = useErrorBoundary();
  const [isLoading, setIsLoading] = useState(false);

  const onHandleSubmit = async (
    { hash }: FormValues,
    { setFieldError, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await api.post(EndpointsEnum.CONFIRM_EMAIL_RESTORE, {
        hash,
      });

      deleteCookie(
        keysValue.DELETED_ACCOUNT_TIME_STAMP,
        keysValue.RESTORE_EMAIL,
        keysValue.RESTORE_TOKEN
      );

      return setRestoreMsgIsShown(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === apiErrorStatus.FORBIDDEN &&
          error.response?.data.error === apiErrorMessage.WRONG_HASH
        ) {
          setError(error);
          setFieldError("hash", apiUiMessage.INVALID_RECOVERY_CODE);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const onHandleCLick = async () => {
    try {
      setIsLoading(true);
      email && (await api.post(EndpointsEnum.EMAIL_RESTORE, { email }));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.status === apiErrorStatus.TOO_MANY_REQUEST) {
          return setShowError(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["restore-email"]}>
      <h3>The code has been sent to your email.</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form className={styles["restore-email__form"]}>
            <TextField
              id="hash"
              name="hash"
              dataAutomation="hashInput"
              label="Confirmation code"
              value={values.hash}
              aria-label="OTP field input"
            />
            <UIbutton
              className={`${styles["restore-email__form-button"]} ${styles["button"]}`}
              dataAutomation="submitButton"
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
              aria-label="Submit form button button"
            >
              Confirm
            </UIbutton>
            <p className={styles["info-message"]}>
              3 attempts per day are provided.
            </p>
          </Form>
        )}
      </Formik>
      <button
        onClick={onHandleCLick}
        className={styles["restore-email__resent-btn"]}
        aria-label="Send OTP button"
      >
        Send the <span>code</span> again?
      </button>
      <Loader isShown={isLoading} />
    </div>
  );
};

export default RestoreEmail;
