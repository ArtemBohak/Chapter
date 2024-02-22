import { Dispatch, ReactNode, SetStateAction } from "react";
import { NotificationType } from "@/src/types/app/notifications.type";

export interface IProfileProviderProps {
  children: ReactNode;
}

type SetBoolean = Dispatch<SetStateAction<boolean>>;

export type ProfileContextType = {
  headerAddPostBtnIsDisabled: boolean;
  unreadMessage: boolean;
  notifications: Array<NotificationType>;
  setNotifications: Dispatch<SetStateAction<Array<NotificationType>>>;
  setHeaderAddPostBtnIsDisabled: SetBoolean;
  setUnreadMessage: SetBoolean;
};
