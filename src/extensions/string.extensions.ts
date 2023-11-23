// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
  limit(this: string, length: number, delimiter?: string): string;
  getId(
    this: string,
    urlDelimiter?: string,
    stringDelimiter?: string,
    sliceValue?: number
  ): string;
}

String.prototype.limit = function (length, delimiter = "") {
  return this.split(" ").slice(0, length).join(" ") + delimiter;
};

String.prototype.getId = function (
  urlDelimiter = "/",
  stringDelimiter = ".",
  sliceValue = -3
) {
  const [id] = this.split(urlDelimiter)
    .slice(sliceValue)
    .join(urlDelimiter)
    .split(stringDelimiter);

  return id;
};
