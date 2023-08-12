import { type FieldTypes } from "../types";
import { findKeys } from ".";

const createObject = (array: FieldTypes[]) =>
  array.reduce((acc: Record<string, string>, item: FieldTypes) => {
    const keys: string = findKeys(item);

    if (
      keys === "email" ||
      keys === "code" ||
      keys === "password" ||
      keys === "confirmPassword"
    )
      acc[keys] = item[keys]!;

    return acc;
  }, {});

export default createObject;
