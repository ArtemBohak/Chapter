import { MutableRefObject, RefObject } from "react";
import { IUser } from "..";

export enum SocketEventsEnum {
  subscribe = "subscribeNotification",
  post = "postNotification",
}

export type SocketEventsType =
  | SocketEventsEnum.subscribe
  | SocketEventsEnum.post;

export interface INotification {
  id: number;
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
  data: {
    message: string;
    postId: number | null;
    user: Required<
      Pick<IUser, "avatarUrl" | "firstName" | "lastName" | "nickName" | "id">
    >;
  };
}
