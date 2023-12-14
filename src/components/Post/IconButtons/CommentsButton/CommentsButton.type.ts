import { PostProps } from "../../Post.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
} & Required<Pick<PostProps, "totalComments" | "id">> &
  Pick<PostProps, "fetchData">;
