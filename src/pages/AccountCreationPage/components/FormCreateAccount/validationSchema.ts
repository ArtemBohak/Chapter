import * as Yup from "yup";

import {
  simpleStringRegex,
  baseValidation,
  nickNameCharsRegex,
} from "@/src/utils";

export default Yup.object({
  fullname: Yup.string()
    .required("Please enter a valid name.")
    .matches(
      simpleStringRegex,
      "Fullname field cannot contain any special symbols or numbers"
    )
    .trim(),
  nickName: Yup.string()
    .matches(nickNameCharsRegex, "Please enter a valid Nickname")
    .required("Please enter a valid Nickname")
    .min(8, "Please enter a valid Nickname")
    .max(30, "Please enter a valid Nickname")
    .trim(),

  password: Yup.string()
    .required("Password is required")
    .matches(
      baseValidation,
      "Password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included."
    )
    .trim(),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .trim()
    .required("Confirm Password is required"),
});
