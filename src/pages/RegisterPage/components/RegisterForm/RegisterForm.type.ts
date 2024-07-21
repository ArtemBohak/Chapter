export enum RegisterAccountKey {
  EMAIL = "email",
  HASH = "hash",
}

export enum EmailStatus {
  CONFIRMED = "This email is already registered with an active account",
  UNCONFIRMED = "This email has already been registered, but is not confirmed",
  REGISTRATION_UNCOMPLETED = "This email has already been registered, but registration is not completed",

  INVALID_HASH = "Hash is not valid.",
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
