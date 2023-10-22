export { emailValidation } from "./regex/email-regex";
export { links } from "./links/links.types";
export {
  setDataToLS,
  getTokenFromLC,
  removeDataFromLS,
  getDataFromLS,
  getExpiresTokenValueFromLS,
} from "./localStorage/localStorage";
export { checkAccessToken } from "./checkAccessToken/checkAccessToken";
export { getCookie, setCookie, deleteCookie } from "./cookies/cookies";
export { default as checkIsCyrillic } from "./checkIsCyrillic/checkIsCyrillic";
export { default as hashingString } from "./hashingString/hashingString";
export { apiErrorMsg, apiErrorStatus } from "./errors/errors.type";
