export const cookieParser = (key = "stateId") => {
  const cookie = document.cookie.split("; ").find((item) => {
    const [keys] = item.split("=");
    if (keys === key) return item;
  });

  const value = cookie && cookie.split("=");
  if (!value) return;
  return value[1];
};
