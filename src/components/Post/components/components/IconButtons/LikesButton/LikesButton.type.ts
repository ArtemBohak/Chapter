import { PostProps } from "@/src/components/Post/Post.type";

export type LikesButtonProps = { hiddenText?: boolean } & Pick<
  PostProps,
  "likesList" | "totalLikes" | "id" | "fetchData"
>;
