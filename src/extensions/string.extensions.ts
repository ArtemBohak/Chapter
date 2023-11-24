// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
  limit(this: string, length: number, delimiter?: string): string;
  getIdFromUrl(
    this: string,
    sliceValue?: number,
    urlDelimiter?: string,
    stringDelimiter?: string
  ): string;
}

String.prototype.limit = function (length, delimiter = "") {
  return this.split(" ").slice(0, length).join(" ") + delimiter;
};

String.prototype.getIdFromUrl = function (
  sliceValue = -3,
  urlDelimiter = "/",
  stringDelimiter = "."
) {
  const [id] = this.split(urlDelimiter)
    .slice(sliceValue)
    .join(urlDelimiter)
    .split(stringDelimiter);

  return id;
};
