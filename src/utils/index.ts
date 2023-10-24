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
export {
  getCookie,
  getCookies,
  setCookies,
  deleteCookie,
} from "./cookies/cookies";
export { default as checkIsCyrillic } from "./checkIsCyrillic/checkIsCyrillic";
export { default as hashingString } from "./hashingString/hashingString";
export {
  apiUiMessage,
  apiErrorStatus,
  apiSuccessStatus,
  apiErrorMessage,
} from "./apiStatus/apiStatus.type";
export { setDate, timer } from "./date/date";
export {
  accountDeletionTerm,
  redirectTimeoutValue,
  keyValue,
} from "./constants/constants";
