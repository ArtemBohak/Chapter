import { type FieldTypes } from "../types";
import { findKeys } from ".";
import { FieldName } from "../enums";

type Values = Pick<
  FieldTypes,
  | FieldName.email
  | FieldName.signUpCode
  | FieldName.password
  | FieldName.confirmPassword
  | FieldName.fullName
  | FieldName.nickName
>;

const createObject = (array: FieldTypes[]) =>
  array.reduce((acc: Record<string, string>, item: FieldTypes) => {
    const keys: string = findKeys(item);

    acc[keys] = item[keys as keyof Values]!;

    return acc;
  }, {});

export default createObject;
