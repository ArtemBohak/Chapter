import { IUser } from "@/src/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IProfileProviderProps {
  children: ReactNode;
}

type SetBoolean = Dispatch<SetStateAction<boolean>>;

export type NotificationType = { messageValue: string } & Required<
  Pick<IUser, "avatarUrl" | "id" | "firstName" | "lastName">
>;

export type ProfileContextType = {
  headerAddPostBtnIsDisabled: boolean;
  unreadMessage: boolean;
  notifications: Array<NotificationType>;
  setNotifications: Dispatch<SetStateAction<Array<NotificationType>>>;
  setHeaderAddPostBtnIsDisabled: SetBoolean;
  setUnreadMessage: SetBoolean;
};
