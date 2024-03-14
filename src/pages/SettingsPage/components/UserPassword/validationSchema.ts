import * as Yup from "yup";

import { baseValidation } from "@/src/utils";

import { ErrorMessages } from "./UserPassword.type";

export default Yup.object({
  oldPassword: Yup.string().required(ErrorMessages.OLD_PASSWORD),
  newPassword: Yup.string()
    .required(ErrorMessages.NEW_PASSWORD)
    .min(8, ErrorMessages.NEW_PASSWORD)
    .max(30, ErrorMessages.NEW_PASSWORD)
    .matches(baseValidation, ErrorMessages.NEW_PASSWORD)
    .notOneOf([Yup.ref("oldPassword")], ErrorMessages.NEW_PASSWORD),

  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], ErrorMessages.CONFIRM_NEW_PASSWORD)
    .trim()
    .required(ErrorMessages.CONFIRM_NEW_PASSWORD),
});
