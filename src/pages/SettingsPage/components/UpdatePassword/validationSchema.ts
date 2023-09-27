import * as Yup from "yup";
import { baseValidation } from "@/src/utils/regex/password-regex";

export default Yup.object({
  oldPassword: Yup.string().required("Enter your old password."),
  newPassword: Yup.string()
    .required(
      "New password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included. Password must be different from the previous one."
    )
    .matches(
      baseValidation,
      "New password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included. Password must be different from the previous one."
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Both passwords must match.")
    .required("Both passwords must match."),
});
