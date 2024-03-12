import { Dispatch, SetStateAction } from "react";
import { INotification } from "@/src/types";

export type ToastProps = {
  setNotifications: Dispatch<SetStateAction<Array<INotification>>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  messageClassNames?: string;
  classNames?: string;
} & INotification;
