// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
  limit(this: string, length: number, delimiter?: string): string;
  isCyrillic(this: string, pattern: RegExp): boolean;
}

String.prototype.limit = function (length, delimiter = "") {
  return this.split(" ").slice(0, length).join(" ") + delimiter;
};

String.prototype.isCyrillic = function (pattern) {
  return pattern.test(this);
};
