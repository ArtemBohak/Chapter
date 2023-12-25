import { PostProps } from "../../Post.type";

export type LikesButtonProps = { hiddenText?: boolean } & Required<
  Pick<PostProps, "usersId" | "postId" | "likeCount">
> &
  Pick<PostProps, "fetchData">;
