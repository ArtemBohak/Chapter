import { IUser } from "..";

export type NotificationType = {
  classNames?: string;
  messageValue: string;
} & Required<Pick<IUser, "avatarUrl" | "id" | "firstName" | "lastName">>;
