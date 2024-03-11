import * as Yup from "yup";

import {
  simpleStringRegex,
  baseValidation,
  nickNameCharsRegex,
  nickNameMinLength,
} from "@/src/utils";

export default Yup.object({
  fullname: Yup.string()
    .required("Please enter a valid name.")
    .min(5, "Full Name must be at least 5 characters long.")
    .max(80, "Full Name must be at least 5 characters long.")
    .matches(
      /^[^\s]+\s[^\s]+$/,
      "Full name field must contain first and second names separated by a space symbol"
    )
    .matches(
      simpleStringRegex,
      "Full name field cannot contain any special symbols or numbers"
    )
    .trim(),

  nickName: Yup.string()
    .matches(nickNameCharsRegex, "Please enter a valid Nickname")
    .required("Please enter a valid Nickname")
    .min(nickNameMinLength, "Please enter a valid Nickname")
    .max(30, "Please enter a valid Nickname")
    .trim(),

  password: Yup.string()
    .required("Password is required")
    .min(
      8,
      "Password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included."
    )
    .max(
      30,
      "Password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included."
    )
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
