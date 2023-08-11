import { findKeys } from ".";

type ArrayType = { label: string; type: string; [field: string]: string }[];

const createObject = (array: ArrayType) =>
  array.reduce((acc: Record<string, string>, item) => {
    const [keys] = findKeys(item);
    acc[keys] = item[keys];
    return acc;
  }, {});

export default createObject;
