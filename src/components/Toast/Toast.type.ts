import { Dispatch, SetStateAction } from "react";
import { INotification, INots } from "@/src/types";

export type ToastProps = {
  setNotifications: Dispatch<SetStateAction<Array<INots>>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  messageClassNames?: string;
  classNames?: string;
} & INotification;
