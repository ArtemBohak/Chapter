import { getExpiresTokenValueFromLS } from "../localStorage/localStorage";

export const tokenIsValid = (): boolean => {
  const tokenExpires = getExpiresTokenValueFromLS();
  return !!tokenExpires && Date.now() <= +tokenExpires;
};
