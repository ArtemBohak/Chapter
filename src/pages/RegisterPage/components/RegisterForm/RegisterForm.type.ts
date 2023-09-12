export enum RegisterAccountKey {
  EMAIL = "email",
  HASH = "hash",
}

export enum ErrorMessage {
  EMAIL = "Email address is already in use.",
  HASH = "Invalid sign up code.",
}

export enum ErrorStatus {
  NOTFOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
}

export enum EmailStatus {
  CONFIRMED = "active",
  UNCONFIRMED = "inactive",
}
export enum Steps {
  FIRST = 1,
  SECOND = 2,
}

export type RegisterFormProps = {
  className?: string;
};

export type RegisterAccountValues = {
  [RegisterAccountKey.EMAIL]: string;
  [RegisterAccountKey.HASH]: string;
};

export type ApiArgs = {
  email?: string;
  hash?: string;
};
