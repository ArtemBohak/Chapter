import { IPost } from "../../Post.type";

export type UserNickNameProps = {
  classNames?: string;
} & Required<Pick<IPost, "nickName">>;
