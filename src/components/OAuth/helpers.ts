export const cookieParser = (key = "stateId") =>
  document.cookie
    .split("; ")
    .find((item) => item.startsWith(key))
    ?.split("=")[1];
