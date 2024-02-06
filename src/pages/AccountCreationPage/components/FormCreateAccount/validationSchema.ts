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
      /^[^\s]+\s[^\s]+$/,
      "Full name field must contain first and second names separated by a space symbol"
    )
    .matches(
      simpleStringRegex,
      "Full name field cannot contain any special symbols or numbers"
    )
    .min(5, 'Full name field cannot be shorter than 5 letters')
    .max(81, 'Full name field cannot be longer than 80 letters')
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
