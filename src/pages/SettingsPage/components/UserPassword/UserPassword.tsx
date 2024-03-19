import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { apiErrorMessage, apiErrorStatus, apiUiMessage } from "@/src/types";

import { emojiRegex } from "@/src/utils";
import validationSchema from "./validationSchema";
import { InitialValues, ErrorMessages } from "./UserPassword.type";
import { ProfileUpdateApi } from "../../utils/ProfileUpdateApi";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./UserPassword.module.scss";

import { PasswordField, UIbutton } from "@/src/components";

const initialValues: InitialValues = {
  oldPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

const UserPassword: FC = () => {
  const setError = useErrorBoundary();
  const onHandleSubmit = async (
    values: InitialValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<InitialValues>
  ) => {
    const profile = new ProfileUpdateApi(undefined, setError);
    const res = await profile.updatePassword(values);

    setSubmitting(false);
    if (
      res?.response?.data.status === apiErrorStatus.BAD_REQUEST &&
      res?.response?.data.error === apiErrorMessage.UPDATE_PASSWORD
    ) {
      return setFieldError("oldPassword", apiUiMessage.WRONG_PASSWORD);
    }
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onHandleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, dirty, isValid, values, handleChange }) => {
        return (
          <Form className={styles["password"]}>
            <PasswordField
              dataAutomation="oldPasswordInput"
              id="oldPassword"
              name="oldPassword"
              autoComplete="current-password"
              additionalLabel={ErrorMessages.OLD_PASSWORD}
              label="Old password"
              aria-label="Old password input field"
              value={values.oldPassword}
              className={`${styles["password__input"]} ${styles["input"]}`}
              onChange={(e) => {
                e.target.value = e.target.value.replace(emojiRegex, "");
                handleChange(e);
              }}
            />
            <PasswordField
              dataAutomation="newPasswordInput"
              id="newPassword"
              name="newPassword"
              autoComplete="new-password"
              additionalLabel={ErrorMessages.NEW_PASSWORD}
              strengthMessage={ErrorMessages.NEW_PASSWORD}
              label="New password"
              value={values.newPassword}
              className={`${styles["password__input"]} ${styles["input"]}`}
              strength
              aria-label="New password input field"
              onChange={(e) => {
                e.target.value = e.target.value.replace(emojiRegex, "");
                handleChange(e);
              }}
            />
            <PasswordField
              dataAutomation="repeatNewPasswordInput"
              id="repeatNewPassword"
              name="repeatNewPassword"
              autoComplete="new-password"
              label="Repeat new password"
              value={values.repeatNewPassword}
              aria-label="Repeat password input field"
              additionalLabel={ErrorMessages.CONFIRM_NEW_PASSWORD}
              className={`${styles["password__input"]} ${styles["input"]}`}
              onChange={(e) => {
                e.target.value = e.target.value.replace(emojiRegex, "");
                handleChange(e);
              }}
            />
            <UIbutton
              type="submit"
              dataAutomation="submitButton"
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
              fullWidth
              className={`${styles["password__button"]} ${styles["button"]}`}
              aria-label="Submit form button"
            >
              Update my password
            </UIbutton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserPassword;
