export const getIdFromUrl = (
  url: string,
  { splitDelimiter = "/", joinDelimiter = "", sliceValue = -3 }
) => {
  const [id] = url
    .split(splitDelimiter)
    .slice(sliceValue)
    .join(joinDelimiter)
    .split(".");

  return id;
};
