import Cookies from "js-cookie";
import { CookieOptions, Cookie } from "./cookies.type";

export const getCookies = (...args: string[]) =>
  args.map((name) => Cookies.get(name));

export const setCookies = (cookies: Cookie, options?: CookieOptions) =>
  Object.keys(cookies).forEach((name) =>
    Cookies.set(name, String(cookies[name]), options)
  );

export const deleteCookie = (...args: string[]) =>
  args.forEach((name) => Cookies.remove(name));
