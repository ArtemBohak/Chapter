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

export type NotificationsRefType =
  | MutableRefObject<null>
  | RefObject<HTMLAnchorElement>;

export interface INotification {
  message: string;
  keyId?: string | number;
  nodeRef?: NotificationsRefType;
  user: Required<
    Pick<IUser, "avatarUrl" | "firstName" | "lastName" | "nickName" | "id">
  >;
}

export type NotificationType = INotification;
