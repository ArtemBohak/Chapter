import { type FieldTypes } from "../types";
import { findKeys } from ".";
import { FieldsName } from "../enums";

type Values = Pick<
  FieldTypes,
  | FieldsName.email
  | FieldsName.signUpCode
  | FieldsName.password
  | FieldsName.confirmPassword
  | FieldsName.fullName
  | FieldsName.nickName
>;

const createObject = (array: FieldTypes[]) =>
  array.reduce((acc: Record<string, string>, item: FieldTypes) => {
    const keys: string = findKeys(item);

    acc[keys] = item[keys as keyof Values]!;

    return acc;
  }, {});

export default createObject;
