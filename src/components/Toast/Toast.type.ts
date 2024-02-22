import { IUser } from "@/src/types";

export type ToastProps = {
  classNames?: string;
  messageValue: string;
  toastId: string;
} & Required<Pick<IUser, "avatarUrl" | "firstName" | "lastName" | "id">>;
