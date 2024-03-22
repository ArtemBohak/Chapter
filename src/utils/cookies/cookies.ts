import Cookies, { attributes } from "js-cookie";
import { CookieValue } from "./cookies.type";

type Options = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
};
Cookies.attributes;
export const getCookies = (...args: string[]) =>
  args.map((name) => Cookies.get(name));

export const setCookies = (cookies: CookieValue, options: Options) => {
  let expires = "";

  if (
    typeof cookieExpirationValue === "number" ||
    typeof cookieExpirationValue === "string"
  ) {
    expires = "max-age=" + cookieExpirationValue;
  }
  if (cookieExpirationValue instanceof Date) {
    expires = "expires=" + cookieExpirationValue.toUTCString();
  }
  Object.keys(cookies).forEach((name) =>
    Cookies.set(name, cookies[name], options)
  );

  Object.keys(cookies).forEach(
    (i: keyof CookieValue) =>
      (document.cookie = `${i}=${cookies[i]};${path};${expires};`)
  );
};

export const deleteCookie = (...args: string[]) =>
  args.forEach((name) => Cookies.remove(name));
