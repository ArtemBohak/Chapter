import { Dispatch, ReactNode, SetStateAction } from "react";
import { INotification, INots } from "@/src/types";

import { PostRefType } from "@/src/types";

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
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  fetchUserPosts: (currentPage: number) => void;
  userPostsList: [] | Array<PostRefType>;
  setUserPostsList: Dispatch<SetStateAction<Array<PostRefType>>>;
  isLoad: boolean;
};
