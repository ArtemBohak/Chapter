export enum RegisterAccountKey {
  EMAIL = "email",
  HASH = "hash",
}

export enum ErrorMessage {
  EMAIL = "Email address is already in use.",
  HASH = "Invalid sign up code.",
}

export enum Steps {
  FIRST = 1,
  SECOND = 2,
}

export type RegisterFormProps = {
  className?: string;
};

export interface IRegisterAccount {
  [RegisterAccountKey.EMAIL]: string;
  [RegisterAccountKey.HASH]: string;
}

export type ErrorResponse = {
  status: number;
};

export type ApiArgs = {
  email?: string;
  hash?: string;
};
