import * as Yup from "yup";
import { RegisterAccountKey } from "./RegisterForm.type";
import { emailValidation } from "@/src/utils";

export const validationSchema = (type: boolean) => {
  if (type)
    return Yup.object().shape({
      [RegisterAccountKey.HASH]: Yup.string().required(
        "Sign up code is required"
      ),
    });

  return Yup.object().shape({
    [RegisterAccountKey.EMAIL]: Yup.string()
      .email("Please enter a valid email address.")
      .matches(emailValidation, "Please enter a valid email address.")
      .required("Email is required"),
  });
};
