import { Dispatch, SetStateAction } from "react";

import { IUser } from "@/src/types";

export type User = Required<
  Pick<
    IUser,
    | "avatarUrl"
    | "firstName"
    | "isSubscribed"
    | "lastName"
    | "nickName"
    | "userId"
  >
>;

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  likesData: Array<User>;
  likeCount: number;
  title?: string;
};
