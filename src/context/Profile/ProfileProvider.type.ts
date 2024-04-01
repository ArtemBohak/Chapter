import { Dispatch, ReactNode, SetStateAction } from "react";
import { INotification, INots } from "@/src/types/app/notifications.type";

export interface IProfileProviderProps {
  children: ReactNode;
}

type SetBoolean = Dispatch<SetStateAction<boolean>>;

export type ProfileContextType = {
  headerAddPostBtnIsDisabled: boolean;
  unreadMessage: number;
  viewedNotifications: Array<INotification>;
  newNotifications: Array<INotification>;
  isLoading: boolean;
  notificationsLength: number;
  setNotifications: Dispatch<SetStateAction<Array<INots>>>;
  setHeaderAddPostBtnIsDisabled: SetBoolean;
  setUnreadMessage: Dispatch<SetStateAction<number>>;
};
