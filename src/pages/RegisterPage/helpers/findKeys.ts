type ObjectType = {
  [x: string]: string;
  label: string;
  type: string;
};

const findKeys = <T extends ObjectType>(obj: T) => {
  return Object.keys(obj).filter((key) => key !== "label" && key !== "type");
};

export default findKeys;
