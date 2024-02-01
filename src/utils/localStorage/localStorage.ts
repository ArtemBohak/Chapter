import { LocaleStorageArgs, keysValue } from "@/src/types";

export const getTokenFromLC = (): string => {
  return JSON.parse(localStorage.getItem(keysValue.ACCESS_TOKEN) || "");
};
export const getExpiresTokenValueFromLS = (): string =>
  JSON.parse(localStorage.getItem(keysValue.TOKEN_EXPIRES) || "");

export const setDataToLS = (data: LocaleStorageArgs) =>
  Object.keys(data).map((i) => {
    localStorage.setItem(i, JSON.stringify(data[i as keyof LocaleStorageArgs]));
  });

export const getDataFromLS = (key: string): string =>
  JSON.parse(localStorage.getItem(key) || "");

export const removeDataFromLS = (...args: string[]) =>
  args.forEach((i) => localStorage.removeItem(i));
