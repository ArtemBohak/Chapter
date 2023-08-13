import { type FieldTypes } from "../types";
import { FieldName } from "../enums";

const findKeys = <T extends FieldTypes>(obj: T) => {
  const [keyValue] = Object.keys(obj).filter(
    (key) =>
      key !== FieldName.label &&
      key !== FieldName.type &&
      key !== FieldName.defaultValue &&
      key !== FieldName.fieldClassName &&
      key !== FieldName.labelClassName &&
      key !== FieldName.strength
  );
  return keyValue;
};

export default findKeys;
