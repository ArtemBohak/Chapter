import { INotification } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type ToastProps = {
  setNotifications: Dispatch<SetStateAction<Array<INotification>>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  messageClassNames?: string;
  classNames?: string;
} & INotification;
