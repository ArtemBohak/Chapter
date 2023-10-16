import { getExpiresTokenValueFromLS } from "../localStorage/localStorage";

export const accessTokenIsExpired = (): boolean => {
  const tokenExpires = getExpiresTokenValueFromLS();

  if (tokenExpires) {
    return Date.now() >= +tokenExpires;
  }
  return true;
};
