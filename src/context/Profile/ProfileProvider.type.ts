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
  isLoad: boolean;
  page: number;
  userPostsList: [] | Array<PostRefType>;
  unreadChatMessages: number;
  setUnreadChatMessages: Dispatch<SetStateAction<number>>;
  setNotifications: Dispatch<SetStateAction<Array<INots>>>;
  setHeaderAddPostBtnIsDisabled: SetBoolean;
  setUnreadMessage: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  fetchUserPosts: (currentPage: number) => void;
  setUserPostsList: Dispatch<SetStateAction<Array<PostRefType>>>;
};
