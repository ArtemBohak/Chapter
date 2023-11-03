// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
  limit(this: string, length: number, delimiter?: string): string;
  isCyrillic(this: string, pattern: RegExp): boolean;
  addNode(
    this: string,
    searchValue: string,
    cb: () => void,
    className: string
  ): string;
}

String.prototype.limit = function (length, delimiter = "") {
  return this.split(" ").slice(0, length).join(" ") + delimiter;
};

String.prototype.isCyrillic = function (pattern) {
  return pattern.test(this);
};

String.prototype.addNode = function (searchValue, cb, className) {
  const arr = this.split(" ")
    .map((i) => {
      if (i[0] === searchValue)
        return `<button onClick={${cb}} className={${className}}>${i}</button>`;

      return i;
    })
    .join(" ");

  return arr;
};
