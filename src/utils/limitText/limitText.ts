const limitText = (
  text: string,
  limitSize: number,
  delimiter: string = "..."
) => text.split(" ").slice(0, limitSize).join(" ") + delimiter;

export default limitText;
