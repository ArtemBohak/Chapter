import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { InitialValues, ErrorMessages } from "./UpdateUserPassword.type";
import validationSchema from "./validationSchema";
import styles from "./UpdateUserPassword.module.scss";

import { PasswordField, UIbutton } from "@/src/components";

const initialValues: InitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const UpdateUserPassword: FC = () => {
  const onHandleSubmit = async (
    values: InitialValues,
    { setSubmitting }: FormikHelpers<InitialValues>
  ) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onHandleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, dirty, isValid }) => {
        return (
          <Form className={styles["update-password"]}>
            <PasswordField
              dataAutomation="oldPassword"
              id="oldPassword"
              name="oldPassword"
              autoComplete="current-password"
              additionalLabel={ErrorMessages.OLD_PASSWORD}
              label="Old password"
              className={`${styles["update-password__input"]} ${styles["input"]}`}
            />
            <PasswordField
              dataAutomation="newPassword"
              id="newPassword"
              name="newPassword"
              autoComplete="new-password"
              additionalLabel={ErrorMessages.NEW_PASSWORD}
              strengthMessage={ErrorMessages.NEW_PASSWORD}
              label="New password"
              className={`${styles["update-password__input"]} ${styles["input"]}`}
              strength
            />
            <PasswordField
              dataAutomation="confirmNewPassword"
              id="confirmNewPassword"
              name="confirmNewPassword"
              autoComplete="new-password"
              label="Repeat new password"
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
