import { getExpiresTokenValueFromLS } from "../localStorage/localStorage";

export const tokenIsValid = (): boolean => {
  const tokenExpires = getExpiresTokenValueFromLS();

  if (tokenExpires) {
    return Date.now() <= +tokenExpires;
  }
  return false;
};
