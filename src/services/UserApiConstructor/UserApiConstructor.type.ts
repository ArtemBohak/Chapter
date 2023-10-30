import { Dispatch, SetStateAction } from "react";
import { AxiosPromise } from "axios";

import { IUserStore } from "@/src/redux";

export type SetIsLoadingType = Dispatch<SetStateAction<boolean>>;

export type User = IUserStore;

export type UserData =
  | Partial<User>
  | Partial<{
      oldPassword: string;
      newPassword: string;
      repeatNewPassword: string;
    }>
  | undefined;

export type cbArgs = Partial<UserData> | undefined;
export type cbFunc = (payload?: cbArgs) => AxiosPromise<UserData>;
