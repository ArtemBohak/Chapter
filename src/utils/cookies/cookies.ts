import { CookieValue } from "./cookies.type";

export const getCookie = (key: string) =>
  document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${key}=`))
    ?.split("=")[1];

export const setCookie = (
  cookieValue: CookieValue,
  cookieExpirationValue?: number | string | Date,
  cookiePath?: string
) => {
  const path = cookiePath ? "path=" + cookiePath : "path=/";
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

  Object.keys(cookieValue).forEach(
    (i: keyof CookieValue) =>
      (document.cookie = `${i}=${cookieValue[i]};${path};${expires};`)
  );
};

export const deleteCookie = (...args: string[]) =>
  args.forEach((item) => setCookie({ [item]: "" }, -1));
