import { PostProps } from "../Post.type";

export type FollowButtonProps = {
  classNames?: string;
} & Required<Pick<PostProps, "isSubscribeToAuthor" | "postId">> &
  Pick<PostProps, "fetchData">;
