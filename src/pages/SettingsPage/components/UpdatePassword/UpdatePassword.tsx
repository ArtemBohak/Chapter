import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { InitialValues } from "./UpdatePassword.type";
import validationSchem from "./validationSchema";
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
      validationSchema={validationSchem}
    >
      {({ isSubmitting, dirty, isValid, values }) => (
        <Form className={styles["update-password"]}>
          <PasswordField
            dataAutomation="oldPassword"
            id="oldPassword"
            name="oldPassword"
            value={values.oldPassword}
            label="Old password"
            className={`${styles["update-password__input"]} ${styles["input"]}`}
          />
          <PasswordField
            dataAutomation="newPassword"
            id="newPassword"
            name="newPassword"
            value={values.newPassword}
            label="New password"
            strengthMessage="New password must be at least 8 characters, including uppercase letters, one number and Latin letters only.
Space symbol is not included. Password must be different from the previous one."
            strength
            className={`${styles["update-password__input"]} ${styles["input"]}`}
          />
          <PasswordField
            dataAutomation="confirmNewPassword"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={values.confirmNewPassword}
            label="Repeat new password"
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
      )}
    </Formik>
  );
};

export default UpdatePassword;

//  <label className={styles["label-container"]}>
//    <span className={cn(styles["label-text"], styles["label-text__top"])}>
//      Old password
//    </span>
//    <span className={styles["input-holder"]}>
//      <Field
//        name="oldPassword"
//        value={values.oldPassword}
//        className={cn(styles["input"])}
//        data-automation="oldPasswordInput"
//      />
//    </span>
//    <span className={cn(styles["label-text"], styles["label-text__bottom"])}>
//      Enter your old password.
//    </span>
//  </label>;
