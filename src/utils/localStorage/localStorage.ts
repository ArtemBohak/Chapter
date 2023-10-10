import { CredArgs } from "./localStorage.type";

export const getTokenFromLC = (): string | null => {
  return localStorage.getItem("token");
};

export const setTokenToLS = (cred: CredArgs) => {
  Object.keys(cred).map((i) => {
    if (cred[i as keyof CredArgs]) {
      localStorage.setItem(i, cred[i as keyof CredArgs] + "");
    }
  });
};
