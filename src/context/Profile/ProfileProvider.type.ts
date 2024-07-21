import { Dispatch, ReactNode, SetStateAction } from "react";
import { INotification, INots, RefType } from "@/src/types";

import { PostRefType } from "@/src/types";

export interface IProfileProviderProps {
  children: ReactNode;
}

export type SetBoolean = Dispatch<SetStateAction<boolean>>;

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
  isPostsLoad: boolean;
  setIsPostsLoad: Dispatch<SetStateAction<boolean>>;
  intersectionRef: RefType | undefined;
  userPostsApi: (
    url: string,
    setPostsList: Dispatch<SetStateAction<PostRefType[]>>,
    page: number,
    setIsPostsLoaded?: SetBoolean,
    postsAction?: "deletePost" | "addPost"
  ) => void,

};
