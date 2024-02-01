import { LocaleStorageArgs, keysValue } from "@/src/types";

export const getTokenFromLC = (): string | null => {
  const value = localStorage.getItem(keysValue.ACCESS_TOKEN);
  if (value) return JSON.parse(value);
  return null;
};
export const getExpiresTokenValueFromLS = (): string | null =>
  localStorage.getItem(keysValue.TOKEN_EXPIRES);

export const setDataToLS = (data: LocaleStorageArgs) =>
  Object.keys(data).map((i) => {
    localStorage.setItem(i, JSON.stringify(data[i as keyof LocaleStorageArgs]));
  });

export const getDataFromLS = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);

  return null;
};

export const removeDataFromLS = (...args: string[]) =>
  args.forEach((i) => localStorage.removeItem(i));
