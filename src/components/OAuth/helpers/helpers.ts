export const getCookie = (key = "stateId") =>
  document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${key}=`))
    ?.split("=")[1];

export const getUrlParams = (
  params: string,
  tokenKey: string,
  stateKey: string
) => {
  const hashParams = new URLSearchParams(params);
  const token = hashParams.get(tokenKey);
  const state = hashParams.get(stateKey);

  return [token, state];
};
