import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { InitialValues, ErrorMessages } from "./UpdateUserPassword.type";
import { apiErrorMessage, apiErrorStatus, apiUiMessage } from "@/src/types";
import validationSchema from "./validationSchema";
import { ProfileUpdateApi } from "../../utils/ProfileUpdateApi";
import { useAppDispatch } from "@/src/redux";
import styles from "./UpdateUserPassword.module.scss";

import { PasswordField, UIbutton } from "@/src/components";

const initialValues: InitialValues = {
  oldPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

const UpdateUserPassword: FC = () => {
  const dispatch = useAppDispatch();

  const onHandleSubmit = async (
    values: InitialValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<InitialValues>
  ) => {
    const profile = new ProfileUpdateApi(dispatch);
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
      {({ isSubmitting, dirty, isValid, values }) => {
        return (
          <Form className={styles["update-password"]}>
            <PasswordField
              dataAutomation="oldPasswordInput"
              id="oldPassword"
              name="oldPassword"
              autoComplete="current-password"
              additionalLabel={ErrorMessages.OLD_PASSWORD}
              label="Old password"
              value={values.oldPassword}
              className={`${styles["update-password__input"]} ${styles["input"]}`}
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
              className={`${styles["update-password__input"]} ${styles["input"]}`}
              strength
            />
            <PasswordField
              dataAutomation="repeatNewPasswordInput"
              id="repeatNewPassword"
              name="repeatNewPassword"
              autoComplete="new-password"
              label="Repeat new password"
              value={values.repeatNewPassword}
              additionalLabel={ErrorMessages.CONFIRM_NEW_PASSWORD}
              className={`${styles["update-password__input"]} ${styles["input"]}`}
            />
            <UIbutton
              type="submit"
              dataAutomation="submitButton"
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
              fullWidth
              className={`${styles["update-password__button"]} ${styles["button"]}`}
            >
              Update my password
            </UIbutton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateUserPassword;
