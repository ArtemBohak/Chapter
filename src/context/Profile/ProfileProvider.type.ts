import { Dispatch, ReactNode, SetStateAction } from "react";
import { INots } from "@/src/types/app/notifications.type";

export interface IProfileProviderProps {
  children: ReactNode;
}

type SetBoolean = Dispatch<SetStateAction<boolean>>;

export type ProfileContextType = {
  headerAddPostBtnIsDisabled: boolean;
  unreadMessage: number;
  notifications: Array<INots>;
  isLoading: boolean;
  setNotifications: Dispatch<SetStateAction<Array<INots>>>;
  setHeaderAddPostBtnIsDisabled: SetBoolean;
  setUnreadMessage: Dispatch<SetStateAction<number>>;
};
