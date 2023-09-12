
export interface ILoginPage {
  email: string;
  password: string;
}

export type setErrors = (fields: { [field: string]: string }) => void
