import * as Yup from "yup";

import { emailValidation } from "@/src/utils";

export default Yup.object({
  email: Yup.string()
    .required("Please enter a valid email.")
    .matches(emailValidation, "Please enter a valid email."),
  password: Yup.string()
    .required("Must be at least 8 symbols")
    .matches(/(?=.{8})/, "Must be at least 8 symbols"),
});
