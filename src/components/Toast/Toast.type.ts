import { INotification, NotificationType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type ToastProps = {
  setNotifications: Dispatch<SetStateAction<Array<INotification>>>;
  messageClassNames?: string;
  classNames?: string;
} & NotificationType;
