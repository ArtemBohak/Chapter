import * as Yup from "yup";

import { simpleStringRegex } from "@/src/utils";

export default Yup.object({
  fullName: Yup.string()
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
});
