// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
  limit(this: string, length: number, delimiter?: string): string;
}

String.prototype.limit = function (length, delimiter = "") {
  return this.split(" ").slice(0, length).join(" ") + delimiter;
};
