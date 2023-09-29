import * as Yup from "yup";
import { baseValidation } from "@/src/utils/regex/password-regex";
import { ErrorMessages } from "./UpdateUserPassword.type";

export default Yup.object({
  oldPassword: Yup.string().required(ErrorMessages.OLD_PASSWORD),
  newPassword: Yup.string()
    .required(ErrorMessages.NEW_PASSWORD)
    .matches(baseValidation, ErrorMessages.NEW_PASSWORD)
    .notOneOf([Yup.ref("oldPassword")], ErrorMessages.NEW_PASSWORD),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], ErrorMessages.CONFIRM_NEW_PASSWORD)
    .required(ErrorMessages.CONFIRM_NEW_PASSWORD),
});
