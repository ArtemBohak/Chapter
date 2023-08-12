import { type FieldTypes } from "../types";

const findKeys = <T extends FieldTypes>(obj: T) => {
  const [keyValue] = Object.keys(obj).filter(
    (key) =>
      key !== "label" &&
      key !== "type" &&
      key !== "defaultValue" &&
      key !== "className" &&
      key !== "strength"
  );
  return keyValue;
};

export default findKeys;
