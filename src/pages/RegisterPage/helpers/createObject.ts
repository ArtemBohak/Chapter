type Array = { name: string; value: string }[];

const createObject = (array: Array) =>
  array.reduce(
    (acc: Record<string, string>, item: { name: string; value: string }) => {
      acc[item.name] = item.value;
      return acc;
    },
    {}
  );

export { createObject };
