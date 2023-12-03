import { PostProps } from "../../Post.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
} & Pick<PostProps, "totalComments" | "id" | "fetchData">;
