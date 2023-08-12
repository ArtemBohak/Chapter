import { findKeys } from ".";

type ItemType = { label: string; type: string; [field: string]: string };

const createObject = (array: ItemType[]) =>
  array.reduce((acc: Record<string, string>, item: ItemType) => {
    const [keys]: Array<string> = findKeys(item);
    acc[keys] = item[keys];
    return acc;
  }, {});

export default createObject;
