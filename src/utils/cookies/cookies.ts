import { CookieValue } from "./cookies.type";

export const getCookie = (key: string) =>
  document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${key}=`))
    ?.split("=")[1];

export const setCookie = (
  cookieValue: CookieValue,
  cookiePath: string = "/",
  cookieExpirationValue: number = 86400
) =>
  Object.keys(cookieValue).forEach(
    (i: keyof CookieValue) =>
      (document.cookie = `${i}=${cookieValue[i]}; path=${cookiePath}; max-age=${cookieExpirationValue}`)
  );

export const deleteCookie = (...args: string[]) =>
  args.forEach((item) => setCookie({ [item]: "" }, undefined, -1));
