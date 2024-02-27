import { MutableRefObject, RefObject } from "react";
import { IUser } from "..";

export enum SocketEvents {
  subscribe = "subscribeNotification",
  post = "postNotification",
}

export type NotificationType = {
  classNames?: string;
  messageValue: string;
  eventType: SocketEvents.subscribe | SocketEvents.post;
  nodeRef: MutableRefObject<null> | RefObject<HTMLAnchorElement>;
  keyId: string | number;
} & Required<Pick<IUser, "avatarUrl" | "firstName" | "id" | "lastName">>;
