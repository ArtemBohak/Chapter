import { LocaleStorageArgs } from "./localStorage.type";

export const getTokenFromLC = (): string | null => {
  return localStorage.getItem("token");
};

export const setDataToLS = (data: LocaleStorageArgs) => {
  Object.keys(data).map((i) => {
    if (data[i as keyof LocaleStorageArgs]) {
      localStorage.setItem(i, data[i as keyof LocaleStorageArgs] + "");
    }
  });
};
