import { PostProps } from "../../Post.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
} & Required<Pick<PostProps, "commentsCount">> &
  Pick<PostProps, "fetchData"> & { id: string | number };
