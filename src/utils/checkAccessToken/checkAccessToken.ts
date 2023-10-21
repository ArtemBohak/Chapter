import { getExpiresTokenValueFromLS } from "../localStorage/localStorage";

export const checkAccessToken = (): boolean => {
  const tokenExpires = getExpiresTokenValueFromLS();

  if (tokenExpires) {
    return Date.now() >= +tokenExpires;
  }
  return true;
};
