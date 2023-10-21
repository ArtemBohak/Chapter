import * as Yup from "yup";
import { baseValidation, lowerUppercaseCharsValidation } from "@/src/utils/regex/password-regex";

export default Yup.object({
  password: Yup.string()
    .required("Password is required")
    .matches(
      (baseValidation && lowerUppercaseCharsValidation),
      "Password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included."
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
