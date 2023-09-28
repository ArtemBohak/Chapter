import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { InitialValues, ErrorMessages } from "./UpdatePassword.type";
import validationSchema from "./validationSchema";
import styles from "./UpdatePassword.module.scss";

import { PasswordField, UIbutton } from "@/src/components";

const initialValues: InitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const UpdatePassword: FC = () => {
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
      {({ isSubmitting, dirty, isValid, values }) => {
        return (
          <Form className={styles["update-password"]}>
            <PasswordField
              dataAutomation="oldPassword"
              id="oldPassword"
              name="oldPassword"
              value={values.oldPassword}
              additionalLabel={ErrorMessages.OLD_PASSWORD}
              label="Old password"
              className={`${styles["update-password__input"]} ${styles["input"]}`}
            />
            <PasswordField
              dataAutomation="newPassword"
              id="newPassword"
              name="newPassword"
              additionalLabel={ErrorMessages.NEW_PASSWORD}
              value={values.newPassword}
              label="New password"
              strengthMessage={ErrorMessages.NEW_PASSWORD}
              strength
              className={`${styles["update-password__input"]} ${styles["input"]}`}
            />
            <PasswordField
              dataAutomation="confirmNewPassword"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={values.confirmNewPassword}
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

export default UpdatePassword;
