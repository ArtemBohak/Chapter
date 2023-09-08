export const cookieParser = (key = "stateId") =>
  document.cookie
    .split("; ")
    .find((item) => item.startsWith(key))
    ?.split("=")[1];

export const getUrlParams = (params: string) => {
  const hashParams = new URLSearchParams(params);
  const accessToken = hashParams.get("access_token");
  const state = hashParams.get("state");

  return [accessToken, state];
};
