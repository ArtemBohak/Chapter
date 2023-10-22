import { LocaleStorageArgs } from "./localStorage.type";

export const getTokenFromLC = (): string | null => {
  return localStorage.getItem("token");
};
export const getExpiresTokenValueFromLS = (): string | null =>
  localStorage.getItem("tokenExpires");

export const setDataToLS = (data: LocaleStorageArgs) =>
  Object.keys(data).map((i) =>
    localStorage.setItem(i, data[i as keyof LocaleStorageArgs] + "")
  );

export const getDataFromLS = (key: string): string | null =>
  localStorage.getItem(key);

export const removeDataFromLS = (...args: string[]) =>
  args.forEach((i) => localStorage.removeItem(i));
