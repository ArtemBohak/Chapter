export type CookieValue = { [key: string]: string | number };

export type CookieOptions = {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
};
