import { NotificationType } from "@/src/types/app/notifications.type";

export type ToastProps = {
  classNames?: string;
  toastId: string;
} & Required<NotificationType>;
