import { CookieValue } from "./cookies.type";

export const getCookie = (key: string) =>
  document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${key}=`))
    ?.split("=")[1];

export const getCookies = (...args: string[]) =>
  args.map(
    (i) =>
      document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${i}=`))
        ?.split("=")[1]
  );

export const setCookies = (
  cookieValue: CookieValue,
  cookieExpirationValue?: number | string | Date,
  cookiePath?: string,
  isSecure: boolean = false
) => {
  const path = cookiePath ? "path=" + cookiePath : "path=/";
  let expires = "";
  const secureFlag = isSecure ? "Secure" : "";

  if (
    typeof cookieExpirationValue === "number" ||
    typeof cookieExpirationValue === "string"
  ) {
    expires = "max-age=" + cookieExpirationValue;
  }
  if (cookieExpirationValue instanceof Date) {
    expires = "expires=" + cookieExpirationValue.toUTCString();
  }

  Object.keys(cookieValue).forEach(
    (i: keyof CookieValue) =>
      (document.cookie = `${i}=${cookieValue[i]};${path};${expires};${secureFlag}`)
  );
};

export const deleteCookie = (...args: string[]) =>
  args.forEach((item) => setCookies({ [item]: "" }, -1));
