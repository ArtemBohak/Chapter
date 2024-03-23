import { StorageArgs, keysValue } from "@/src/types";

export const getTokenFromLC = (): string | null => {
  const value = localStorage.getItem(keysValue.ACCESS_TOKEN);

  return value ? JSON.parse(value) : null;
};

export const getExpiresTokenValueFromLS = (): string | null =>
  localStorage.getItem(keysValue.TOKEN_EXPIRES);

export const setDataToLS = (data: StorageArgs) =>
  Object.keys(data).map((name) =>
    localStorage.setItem(name, JSON.stringify(data[name]))
  );

export const getDataFromLS = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeDataFromLS = (...args: string[]) =>
  args.forEach((i) => localStorage.removeItem(i));
