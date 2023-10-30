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
