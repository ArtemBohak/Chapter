import { IUser } from "@/src/types";

export type NotificationProps = {
  classNames?: string;
  messageValue: string;
} & Required<Pick<IUser, "avatarUrl" | "firstName" | "id" | "lastName">>;
