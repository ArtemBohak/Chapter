import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";

type Props = {
  children: React.ReactNode;
} & FormikConfig<FormikValues>;

const FormWrapper: React.FC<Props> = ({ children, ...props }) => {
  return <Formik {...props}>{children}</Formik>;
};
export default FormWrapper;
