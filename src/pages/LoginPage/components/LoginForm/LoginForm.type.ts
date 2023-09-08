export interface ILoginPage {
  email: string;
  password: string;
}

export type SetFieldError = (field: string, errorMsg: string) => void;
