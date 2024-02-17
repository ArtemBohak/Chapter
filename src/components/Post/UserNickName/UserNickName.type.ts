import { IUser } from "@/src/types";

export type UserNickNameProps = {
  classNames?: string;
} & Required<Pick<IUser, "nickName">>;
