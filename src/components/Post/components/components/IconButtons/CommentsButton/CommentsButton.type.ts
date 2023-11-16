import { PostProps } from "@/src/components/Post/Post.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
} & Pick<PostProps, "totalComments" | "id" | "fetchData">;
