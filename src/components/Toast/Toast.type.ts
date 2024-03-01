import { NotificationsRefType, NotificationType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type ToastProps = {
  setNotifications: Dispatch<SetStateAction<Array<NotificationType>>>;
  messageClassNames?: string;
  classNames?: string;
  nodeRef: NotificationsRefType;
} & NotificationType;
