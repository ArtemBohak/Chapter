export enum RegisterAccountKey {
  EMAIL = "email",
  HASH = "hash",
}

export enum EmailStatus {
  CONFIRMED = "active",
  UNCONFIRMED = "inactive",
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
