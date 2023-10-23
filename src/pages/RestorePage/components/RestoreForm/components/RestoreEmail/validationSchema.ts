import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  hash: Yup.string().required("Sign up code is required"),
});
