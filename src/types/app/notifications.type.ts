import { IUser } from "..";

export type NotificationType = {
  messageValue: string;
} & Required<Pick<IUser, "avatarUrl" | "id" | "firstName" | "lastName">>;
