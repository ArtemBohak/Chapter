import { type FieldTypes } from "../types";
import { findKeys } from ".";

enum ValuesKeys {
  email = "email",
  signUpCode = "signUpCode",
  password = "password",
  confirmPassword = "confirmPassword",
  fullName = "fullName",
  nickName = "nickName",
}

type Values = Pick<
  FieldTypes,
  | ValuesKeys.email
  | ValuesKeys.signUpCode
  | ValuesKeys.password
  | ValuesKeys.confirmPassword
  | ValuesKeys.fullName
  | ValuesKeys.nickName
>;

const createObject = (array: FieldTypes[]) =>
  array.reduce((acc: Record<string, string>, item: FieldTypes) => {
    const keys: string = findKeys(item);

    acc[keys] = item[keys as keyof Values]!;

    return acc;
  }, {});

export default createObject;
