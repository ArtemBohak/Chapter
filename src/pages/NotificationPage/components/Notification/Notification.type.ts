import { NotificationType } from "@/src/types/app/notifications.type";
import { Dispatch, SetStateAction } from "react";

export type NotificationProps = {
  classNames?: string;
  messageValue: string;
  setNotifications: Dispatch<SetStateAction<Array<NotificationType>>>;
} & Omit<NotificationType, "toastId">;
