import { FC } from "react";

import { Formik, Form, FormikProps } from "formik";

import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";
import TextField from "@/src/components/Fields/TextField/TextField";
import PasswordField from "@/src/components/Fields/PasswordField/PasswordField";

import validationSchema from "./validationSchema";
import { IAccountCreate } from "./FormCreateAccount.types";

const initialValues: IAccountCreate = {
  fullname: "",
  nickname: "",
  password: "",
  confirm_password: "",
};

const FormCreateAccount: FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // temp
        setTimeout(() => {
          console.log("values", values);
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }: FormikProps<IAccountCreate>) => (
        <Form>
          <TextField
            id="fullname"
            name="fullname"
            label="Full Name"
            placeholder="Full Name"
            dataAutomation="fullname"
          />
          <TextField
            id="nickname"
            name="nickname"
            label="Nickname"
            placeholder="nickname"
            dataAutomation="nickname"
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
            title="Submit"
            variant="orange-contained"
            size="lg"
            dataAutomation="submitButton"
          />
          {isSubmitting ? "Loading..." : null}
        </Form>
      )}
    </Formik>
  );
};

export default FormCreateAccount;
