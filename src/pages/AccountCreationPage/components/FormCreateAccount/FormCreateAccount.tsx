import { FC } from "react";
import cn from "classnames";

import { Formik, Form, FormikProps } from "formik";

import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";
import { TextField, PasswordField } from "@/src/components/Fields";

import validationSchema from "./validationSchema";
import { IAccountCreate } from "./FormCreateAccount.type";

import styles from "./FormCreateAccount.module.scss";

const initialValues: IAccountCreate = {
  fullname: "",
  nickname: "",
  password: "",
  confirm_password: "",
};

const FormCreateAccount: FC = () => {
  return (
    <div className={cn(styles["form-create-account"])}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("values", values);
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting, isValid, dirty }: FormikProps<IAccountCreate>) => (
          <Form>
            <TextField
              id="fullname"
              name="fullname"
              label="Full Name"
              placeholder="Full Name"
              dataAutomation="fullname"
              showSuccessIcon={true}
            />
            <TextField
              id="nickname"
              name="nickname"
              label="Nickname"
              placeholder="nickname"
              dataAutomation="nickname"
              showSuccessIcon={true}
            />
            <PasswordField
              id="password"
              name="password"
              label="Create password"
              placeholder="Enter your password"
              strength
              dataAutomation="password"
            />
            <PasswordField
              id="confirm_password"
              name="confirm_password"
              label="Confirm password"
              placeholder="Re-enter your password"
              dataAutomation="confirm_password"
            />
            <UIbutton
              type="submit"
              variant="orange-contained"
              dataAutomation="submitButton"
              className="p-[12px] text-sm"
              disabled={!isValid || !dirty}
            >
              Submit
            </UIbutton>
            {isSubmitting ? "Loading..." : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreateAccount;
