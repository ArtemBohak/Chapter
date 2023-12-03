import { PostProps } from "../Post.type";

export type UserNickNameProps = Pick<PostProps, "nickName"> & {
  classNames?: string;
};
