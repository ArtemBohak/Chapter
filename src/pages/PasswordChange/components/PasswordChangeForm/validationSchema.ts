import * as Yup from "yup";
import { baseValidation, lowerUppercaseCharsValidation } from "@/src/utils";

export default Yup.object({
  password: Yup.string()
    .required("Password is required")
    .matches(
      baseValidation && lowerUppercaseCharsValidation,
      "Password must be at least 8 characters long, include only Latin letters, one uppercase letter, one number, space symbol mustn't be included"
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
