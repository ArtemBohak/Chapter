import { LocaleStorageArgs, keysValue } from "@/src/types";

export const getTokenFromLC = (): string | null => {
  return localStorage.getItem(keysValue.ACCESS_TOKEN);
};
export const getExpiresTokenValueFromLS = (): string | null =>
  localStorage.getItem(keysValue.TOKEN_EXPIRES);

export const setDataToLS = (data: LocaleStorageArgs) =>
  Object.keys(data).map((i) => {
    localStorage.setItem(i, String(data[i as keyof LocaleStorageArgs]));
  });

export const getDataFromLS = (key: string): string | null =>
  localStorage.getItem(key);

export const removeDataFromLS = (...args: string[]) =>
  args.forEach((i) => localStorage.removeItem(i));

export const setRecentSearch = (key: string, value: Array<string>) => {
  localStorage.setItem(key, JSON.stringify(value));
};
