import { Dispatch, ReactNode, SetStateAction } from "react";
import { INotification } from "@/src/types/app/notifications.type";

export interface IProfileProviderProps {
  children: ReactNode;
}

type SetBoolean = Dispatch<SetStateAction<boolean>>;

export type ProfileContextType = {
  headerAddPostBtnIsDisabled: boolean;
  unreadMessage: number;
  notifications: Array<INotification>;
  setNotifications: Dispatch<SetStateAction<Array<INotification>>>;
  setHeaderAddPostBtnIsDisabled: SetBoolean;
  setUnreadMessage: Dispatch<SetStateAction<number>>;
};
