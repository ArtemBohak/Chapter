import { type FieldTypes } from "../types";

enum MetaKeys {
  label = "label",
  type = "type",
  defaultValue = "defaultValue",
  fieldClassName = "fieldClassName",
  labelClassName = "labelClassName",
  strength = "strength",
}

const findKeys = <T extends FieldTypes>(obj: T) => {
  const [keyValue] = Object.keys(obj).filter(
    (key) =>
      key !== MetaKeys.label &&
      key !== MetaKeys.type &&
      key !== MetaKeys.defaultValue &&
      key !== MetaKeys.fieldClassName &&
      key !== MetaKeys.labelClassName &&
      key !== MetaKeys.strength
  );
  return keyValue;
};

export default findKeys;
