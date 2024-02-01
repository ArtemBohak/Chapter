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

export const getDataFromLS = <T>(key: string): T | null => {
  const k = localStorage.getItem(key);
  if (k) return JSON.parse(k);

  return null;
};

export const removeDataFromLS = (...args: string[]) =>
  args.forEach((i) => localStorage.removeItem(i));
