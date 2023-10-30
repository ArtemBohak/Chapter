export interface IPasswordChange {
    password: string;
    hash: string;
  }


  export type ChangePasswordValues = {
    password: string;
    hash: string;
  };

  export type ApiArgs = {
    password?: string;
    hash?: string;
  };
