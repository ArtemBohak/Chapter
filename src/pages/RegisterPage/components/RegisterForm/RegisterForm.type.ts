export enum RegisterAccountKey {
  EMAIL = "email",
  HASH = "hash",
}

export enum EmailStatus {
  CONFIRMED = "active",
  UNCONFIRMED = "this email has already been registered, but is not confirmed",
}
export enum Steps {
  FIRST = 1,
  SECOND = 2,
}

export type RegisterAccountValues = {
  [RegisterAccountKey.EMAIL]: string;
  [RegisterAccountKey.HASH]: string;
};

export type ApiArgs = {
  email?: string;
  hash?: string;
};
