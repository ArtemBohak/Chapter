import { type FieldTypes } from "../types";
import { FieldsName } from "../enums";

const findKeys = <T extends FieldTypes>(obj: T) => {
  const [keyValue] = Object.keys(obj).filter(
    (key) =>
      key !== FieldsName.label &&
      key !== FieldsName.type &&
      key !== FieldsName.defaultValue &&
      key !== FieldsName.className
  );
  return keyValue;
};

export default findKeys;
