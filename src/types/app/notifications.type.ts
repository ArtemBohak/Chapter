import { MutableRefObject, RefObject } from "react";
import { IUser } from "..";

export enum SocketEvents {
  subscribe = "subscribeNotification",
  post = "postNotification",
}

export type SocketEventsType = SocketEvents.subscribe | SocketEvents.post;

export interface INotification {
  message: string;
  user: Required<
    Pick<IUser, "avatarUrl" | "firstName" | "lastName" | "nickName" | "id">
  >;
}

export type NotificationType = {
  eventType: SocketEventsType;
  keyId: string | number;
} & INotification;

export type NotificationsRefType =
  | MutableRefObject<null>
  | RefObject<HTMLAnchorElement>;
