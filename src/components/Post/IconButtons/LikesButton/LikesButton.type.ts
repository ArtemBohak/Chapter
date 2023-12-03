import { PostProps } from "../../Post.type";

export type LikesButtonProps = { hiddenText?: boolean } & Pick<
  PostProps,
  "likesList" | "totalLikes" | "id" | "fetchData"
>;
