import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";

// FormWrapper always needs to get such props as initialValues, onSubmit, validationSchema
// initialValues should have the same property names you pass to TextField, PasswordField
// as their prop 'name'

//onSubmit

type Props = {
  children: React.ReactNode | React.ReactElement | JSX.Element;
} & FormikConfig<FormikValues>;

const FormWrapper: React.FC<Props> = ({ children, ...props }) => {
  return <Formik {...props}>{children}</Formik>;
};
export default FormWrapper;
