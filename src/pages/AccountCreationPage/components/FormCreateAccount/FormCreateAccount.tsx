import { FC } from "react";

import { Formik, Form } from "formik";

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
      onSubmit={(values, actions) => {
        console.log(values);
        console.log(actions);
      }}
    >
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
          dataAutomation="create-account-button"
        />
      </Form>
    </Formik>
  );
};

export default FormCreateAccount;
