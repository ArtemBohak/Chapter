import { PostProps } from "../Post.type";

export type UserNickNameProps = {
  classNames?: string;
} & Required<Pick<PostProps, "author">>;
