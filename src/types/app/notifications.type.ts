import { MutableRefObject, RefObject } from "react";
import { IUser } from "..";

export enum SocketEvents {
  subscribe = "subscribeNotification",
  post = "postNotification",
}

export enum SocketMessage {
  newPost = "New post",
}

export type SocketEventsType = SocketEvents.subscribe | SocketEvents.post;

type NotificationsRefType = MutableRefObject<null> | RefObject<HTMLDivElement>;

export interface INotification {
  id: number;
  nodeRef?: NotificationsRefType;
  data: {
    message: string;
    postId: number | null;
    user: Required<
      Pick<IUser, "avatarUrl" | "firstName" | "lastName" | "nickName" | "id">
    >;
  };
}
