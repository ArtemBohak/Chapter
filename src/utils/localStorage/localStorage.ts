import { CredArgs } from "./localStorage.type";

export const getTokenFromLC = (): string | null => {
  return localStorage.getItem("token");
};

export const setTokenToLC = (cred: CredArgs) => {
  Object.keys(cred).map((i) =>
    localStorage.setItem(i, cred[i as keyof CredArgs])
  );
};
