import { IUser } from "..";

export enum SocketEvents {
  subscribe = "subscribeNotification",
  post = "postNotification",
}

export type NotificationType = {
  classNames?: string;
  messageValue: string;
  eventType: SocketEvents.subscribe | SocketEvents.post;
} & Required<Pick<IUser, "avatarUrl" | "id" | "firstName" | "lastName">>;
