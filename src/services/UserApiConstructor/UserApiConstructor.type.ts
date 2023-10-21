import { IUserStore } from "@/src/redux/types/user";
import { Dispatch, SetStateAction } from "react";

export type SetIsLoadingType = Dispatch<SetStateAction<boolean>>;

export type UserData =
  | Partial<IUserStore>
  | Partial<{
      oldPassword: string;
      newPassword: string;
      repeatNewPassword: string;
    }>
  | undefined;
