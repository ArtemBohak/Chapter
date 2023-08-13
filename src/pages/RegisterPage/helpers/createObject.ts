import { type FieldTypes } from "../types";
import { findKeys } from ".";

const createObject = (array: FieldTypes[]) =>
  array.reduce((acc: Record<string, string>, item: FieldTypes) => {
    const keys: string = findKeys(item);

    if (
      keys === "email" ||
      keys === "signUpCode" ||
      keys === "password" ||
      keys === "confirmPassword" ||
      keys === "fullName" ||
      keys === "nickName"
    )
      acc[keys] = item[keys]!;

    return acc;
  }, {});

export default createObject;
