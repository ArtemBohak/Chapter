import * as Yup from "yup";
import { baseValidation, lowerUppercaseCharsValidation } from "@/src/utils";

export default Yup.object({
  password: Yup.string()
    .required("Password is required")
    .matches(
      baseValidation && lowerUppercaseCharsValidation,
      "New password must be at least 8 characters, including uppercase letters and special characters and be different from the previous one."
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Both passwords must match")
    .required("Confirm Password is required"),
});
