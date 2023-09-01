export type RegisterFormProps = {
  className?: string;
};

export enum RegisterAccountKey {
  EMAIL = "email",
  HASH = "hash",
}

export interface IRegisterAccount {
  [RegisterAccountKey.EMAIL]: string;
  [RegisterAccountKey.HASH]: string;
}

export enum Steps {
  FIRST = 1,
  SECOND = 2,
}

export type ErrorResponse = {
  status: number;
};
