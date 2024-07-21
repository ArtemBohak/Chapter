import { IUser } from "@/src/types";

export type UserProps = Pick<
  IUser,
  "id" | "nickName" | "isSubscribed" | "avatarUrl"
>;
