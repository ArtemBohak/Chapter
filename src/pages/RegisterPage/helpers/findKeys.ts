const findKeys = (obj: {
  [x: string]: string;
  label: string;
  type: string;
}) => {
  return Object.keys(obj).filter((key) => key !== "label" && key !== "type");
};

export default findKeys;
