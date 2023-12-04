import { PostProps } from "../../Post.type";

export type LikesButtonProps = { hiddenText?: boolean } & Required<
  Pick<PostProps, "likesList" | "totalLikes" | "id">
> &
  Pick<PostProps, "fetchData">;
