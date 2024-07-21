import * as Yup from "yup";

import { emailValidation } from "@/src/utils";

export default Yup.object({
  email: Yup.string()
    .required("Please enter a valid email.")
    .matches(emailValidation, "Please enter a valid email"),
});
