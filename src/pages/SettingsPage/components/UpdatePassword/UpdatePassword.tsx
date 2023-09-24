import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

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
          <UIbutton
            type="submit"
            dataAutomation="submitButtom"
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
