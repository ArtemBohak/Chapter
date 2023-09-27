import { FC } from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import cn from "classnames";

import { InitialValues } from "./UpdatePassword.type";
import styles from "./UpdatePassword.module.scss";

import { UIbutton } from "@/src/components";

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
    <Formik initialValues={initialValues} onSubmit={onHandleSubmit}>
      {({ isSubmitting, dirty, isValid, values }) => (
        <Form className={styles["update-password-container"]}>
          <label className={styles["label-container"]}>
            <span
              className={cn(styles["label-text"], styles["label-text__top"])}
            >
              Old password
            </span>
            <span className={styles["input-holder"]}>
              <Field
                name="oldPassword"
                value={values.oldPassword}
                className={cn(styles["input"])}
                data-automation="oldPasswordInput"
              />
            </span>
            <span
              className={cn(styles["label-text"], styles["label-text__bottom"])}
            >
              Enter your old password.
            </span>
          </label>
          <UIbutton
            type="submit"
            dataAutomation="submitButton"
            isLoading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            fullWidth
            className={`${styles["update-password-container__button"]} ${styles["button"]}`}
          >
            Update my password
          </UIbutton>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePassword;
