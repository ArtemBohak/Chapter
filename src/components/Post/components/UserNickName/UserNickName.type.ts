import { IPostProps } from "../../Post.type";

export type UserNickNameProps = {
  classNames?: string;
} & Required<Pick<IPostProps, "nickName">>;
