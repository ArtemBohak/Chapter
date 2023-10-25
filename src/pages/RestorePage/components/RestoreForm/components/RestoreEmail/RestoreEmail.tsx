import { FC } from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { FormValues, RestoreEmailProps } from "./RestoreEmail.type";
import {
  apiErrorMessage,
  apiErrorStatus,
  apiUiMessage,
  links,
  keysValue,
} from "@/src/types";
import { deleteCookie } from "@/src/utils";
import { EndpointsEnum, api } from "@/src/axios";
import { validationSchema } from "./validationSchema";
import styles from "./RestoreEmail.module.scss";

import { TextField, UIbutton } from "@/src/components";

const initialValues: FormValues = {
  hash: "",
};

const RestoreEmail: FC<RestoreEmailProps> = ({ email }) => {
  const navigate = useNavigate();

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

      return navigate(links.LOG_IN);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === apiErrorStatus.FORBIDDEN &&
          error.response?.data.error === apiErrorMessage.WRONG_HASH
        ) {
          setFieldError("hash", apiUiMessage.INVALID_RECOVERY_CODE);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const onHandleCLick = async () => {
    try {
      email && (await api.post(EndpointsEnum.EMAIL_RESTORE, { email }));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
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
            />
            <UIbutton
              className={`${styles["restore-email__form-button"]} ${styles["button"]}`}
              dataAutomation="submitButton"
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
            >
              Confirm
            </UIbutton>
          </Form>
        )}
      </Formik>
      <button
        onClick={onHandleCLick}
        className={styles["restore-email__resent-btn"]}
      >
        Send the <span>code</span> again?
      </button>
    </div>
  );
};

export default RestoreEmail;
